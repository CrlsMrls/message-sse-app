import { Module } from '@nestjs/common';
import { GcpController } from './gcp/gcp.controller';

@Module({
  controllers: [GcpController]
})
export class GcpModule {}
