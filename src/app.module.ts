import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';

import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from './modules/common/config/config.module';
import { CommonModule } from './modules/common/common.module';
import { PostModule } from './modules/post/post.module';
import { AddressesModule } from './modules/addresses/addresses.module';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
@Module({
  imports: [ConfigModule, UserModule, DatabaseModule, CommonModule, PostModule, AddressesModule],
})
export class AppModule {}
