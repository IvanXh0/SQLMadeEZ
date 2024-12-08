import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CreatorModule } from './creator/creator.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableModule } from './table/table.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        if (config.get('IS_PROD') === 'true') {
          console.log(
            'DB_CONNECTION_STRING',
            config.get('DB_CONNECTION_STRING'),
          );
          return {
            type: 'postgres',
            url: config.get('DB_CONNECTION_STRING'),
            synchronize: true,
            logging: false,
            autoLoadEntities: true,
            ssl: true,
          };
        } else {
          return {
            type: 'postgres',
            host: config.get('DB_HOST'),
            port: config.get('DB_PORT'),
            username: config.get('DB_USER'),
            password: config.get('DB_PASSWORD'),
            database: config.get('DB_NAME'),
            synchronize: true,
            logging: false,
            autoLoadEntities: true,
          };
        }
      },
    }),
    UserModule,
    CreatorModule,
    TableModule,
    SubscriptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
