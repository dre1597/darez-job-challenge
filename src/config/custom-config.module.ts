import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { apiConfig, databaseConfig, omdbApiConfig } from './custom-config';

export class ConfigValidationDto {
  @IsOptional()
  @IsString()
  PORT?: string;

  @IsOptional()
  @IsEnum(['development', 'production', 'test'])
  NODE_ENV?: string;

  @IsOptional()
  @IsString()
  DATABASE_HOST?: string;

  @IsOptional()
  @IsString()
  DATABASE_PORT?: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_USER: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  DATABASE_NAME: string;

  @IsOptional()
  @IsString()
  DATABASE_SYNCHRONIZE?: string;

  @IsOptional()
  @IsString()
  DATABASE_MIGRATIONS_RUN?: string;

  @IsOptional()
  @IsString()
  DATABASE_HOST_TEST?: string;

  @IsOptional()
  @IsString()
  DATABASE_PORT_TEST?: string;

  @IsOptional()
  @IsString()
  DATABASE_USER_TEST?: string;

  @IsOptional()
  @IsString()
  DATABASE_PASSWORD_TEST?: string;

  @IsOptional()
  @IsString()
  DATABASE_NAME_TEST?: string;

  @IsOptional()
  @IsString()
  DATABASE_SYNCHRONIZE_TEST?: string;

  @IsOptional()
  @IsString()
  DATABASE_MIGRATIONS_RUN_TEST?: string;

  @IsNotEmpty()
  @IsString()
  OMDB_API_URL: string;

  @IsNotEmpty()
  @IsString()
  OMDB_API_KEY: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig, databaseConfig, omdbApiConfig],
      isGlobal: true,
      envFilePath: '.env',
      validate: (config: Record<string, any>) => {
        const validatedConfig = plainToInstance(ConfigValidationDto, config);
        const errors = validateSync(validatedConfig);
        if (errors.length > 0) {
          throw new Error(`Config validation failed: ${errors.toString()}`);
        }
        return config;
      },
    }),
  ],
  exports: [ConfigModule],
})
export class CustomConfigModule {}
