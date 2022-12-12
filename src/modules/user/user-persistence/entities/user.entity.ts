import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import AddressEntity from '../../../addresses/addresses-persistence/entities/address.entity';

@Entity('user')
@Unique(['id'])
@Unique(['email'])
@Unique(['phone'])
class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column({ length: 255 })
  public phone: string;

  @Column({ nullable: true })
  public age: number;

  @OneToOne(() => AddressEntity, (address) => address.user, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  address: AddressEntity;
}

export default UserEntity;
