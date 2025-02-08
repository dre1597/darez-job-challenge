import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { CustomConfigModule } from '../config/custom-config.module';
import { TypeormService } from './typeorm.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [CustomConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isTestEnvironment = configService.get('api.nodeEnv') === 'test';

        return {
          type: 'postgres',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.user'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
          dropSchema: isTestEnvironment,
          migrationsTableName: 'migration',
          entities: isTestEnvironment
            ? ['src/**/*.entity{.ts,.js}']
            : ['dist/**/*.entity{.ts,.js}'],
          migrations: isTestEnvironment
            ? ['src/migrations/*{.ts,.js}']
            : ['dist/migrations/*.js'],
          migrationsTransactionMode: 'each',
          uuidExtension: 'uuid-ossp',
          installExtensions: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
    }),
  ],
  providers: [TypeormService],
})
export class PostgresModule {}
