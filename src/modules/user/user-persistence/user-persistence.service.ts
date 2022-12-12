import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserPersistenceService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async createUser(dto: UserDto) {
    const newUser = this.usersRepository.create(dto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateUser(id: number, userDto: UpdateUserDto) {
    await this.usersRepository.update(id, userDto);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    if (updatedUser) {
      return updatedUser;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async findOne(filter) {
    const user = this.usersRepository.findOne(filter);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async find() {
    return this.usersRepository.find();
  }
}
