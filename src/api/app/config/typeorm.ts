import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOSTNAME || 'localhost',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USERNAME || 'db-user',
  password: process.env.DB_PASSWORD || 'passwd',
  database: process.env.DB_NAME || 'test',
  //   entities: [__dirname + '/../**/*.entity.{js,ts}'],
  autoLoadEntities: true,
  synchronize: process.env.DB_TYPEORM_SYNC === 'true',
};
