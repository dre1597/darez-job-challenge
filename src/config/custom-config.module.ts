import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { IsEnum, IsOptional, IsString, validateSync } from 'class-validator';
import { apiConfig } from './custom-config';

export class ConfigValidationDto {
  @IsOptional()
  @IsString()
  PORT?: number;

  @IsOptional()
  @IsEnum(['development', 'production', 'test'])
  NODE_ENV?: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [apiConfig],
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
