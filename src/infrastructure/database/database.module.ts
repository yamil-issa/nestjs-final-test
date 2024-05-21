import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: async (configService: ConfigurationService) => ({
        uri: `mongodb://localhost:${configService.databaseConfig.DATABASE_PORT}/${configService.databaseConfig.DATABASE_NAME}`,
      }),
      inject: [ConfigurationService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
