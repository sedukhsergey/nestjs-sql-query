import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserPersistenceService } from './user-persistence/user-persistence.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserEntity from './user-persistence/entities/user.entity';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    private readonly userPersistenceService: UserPersistenceService,
  ) {}

  async createUser(dto: UserDto) {
    try {
      return this.userPersistenceService.createUser(dto);
    } catch (err) {
      console.log('err', err);
    }
  }

  async updateUser(
    id: number,
    userDto: UpdateUserDto,
  ): Promise<UserEntity | any> {
    try {
      const data = plainToClass(UpdateUserDto, userDto, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
        exposeUnsetFields: false,
      });

      return this.userPersistenceService.updateUser(id, data);
    } catch (err) {
      console.log('err', err);
    }
  }

  async findUser(filter) {
    const user = this.userPersistenceService.findOne(filter);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async findAllUsers() {
    const user = this.userPersistenceService.find();
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
