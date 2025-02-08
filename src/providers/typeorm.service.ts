import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Injectable()
export class TypeormService implements OnModuleInit {
  private logger = new Logger(TypeormService.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.synchronizeDatabase();
    await this.runMigrations();
  }

  async synchronizeDatabase() {
    if (this.configService.get('database.synchronize')) {
      this.logger.log('Synchronizing database...');
      await this.dataSource.synchronize();
    }
  }

  async runMigrations() {
    if (this.configService.get('database.migrationsRun')) {
      this.logger.log('Running migrations...');
      await this.dataSource.runMigrations();
    }
  }
}
