import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        AppRoutingModule,
        ConfigurationModule,
        DatabaseModule,
        MongooseModule.forRoot('mongodb://localhost:24000/nestjs-final-test-db'),       
    ],
})
export class AppModule {}
