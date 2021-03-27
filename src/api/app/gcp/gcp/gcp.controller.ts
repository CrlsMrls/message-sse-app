import {
  Controller,
  Get,
  MethodNotAllowedException,
  Param,
} from '@nestjs/common';

import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

@Controller('gcp')
export class GcpController {
  @Get('/secret/:id')
  async getSecret(@Param('id') id: string): Promise<string> {
    const secret = await this.accessSecret(id);

    return `secret: ${secret}`;
  }

  async accessSecret(name): Promise<string> {
    if (!process.env.GCP_PROJECT_NUMBER) {
      throw new MethodNotAllowedException();
    }
    const gcpSecretManagerClient = new SecretManagerServiceClient();
    const secretName = `projects/${process.env.GCP_PROJECT_NUMBER}/secrets/${name}/versions/latest`;

    const [version] = await gcpSecretManagerClient.accessSecretVersion({
      name: secretName,
    });

    return version.payload.data.toString();
  }
}
