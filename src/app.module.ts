import { Module } from '@nestjs/common';

import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from './modules/common/config/config.module';
import { CommonModule } from './modules/common/common.module';
@Module({
  imports: [ConfigModule, DatabaseModule, CommonModule,],
})
export class AppModule {}
