import { Module } from '@nestjs/common';
import { AddressesPersistenceModule } from './addresses-persistence/addresses-persistence.module';

@Module({
  imports: [AddressesPersistenceModule]
})
export class AddressesModule {}
