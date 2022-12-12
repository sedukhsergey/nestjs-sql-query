import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import UserEntity from '../../../user/user-persistence/entities/user.entity';

@Entity('address')
@Unique(['id'])
class AddressEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ length: 30, nullable: false })
  public street: string;

  @Column({ length: 30, nullable: false })
  public city: string;

  @Column({ length: 30 })
  public state: string;

  @OneToOne(() => UserEntity, (user) => user.address, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;
}

export default AddressEntity;
