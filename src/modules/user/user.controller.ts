import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '../../pipes/validation.pipe';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiQuery,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { FindByRoleDto } from './dto/find-by-role.dto';
import { UserRole } from './dto/user-role.enum';
import { BusinessEnum } from './dto/business.enum';
import { User } from './dto/user';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/file-upload.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserEntity from './user-persistence/entities/user.entity';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiSecurity('basic')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer auth-token',
})
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiQuery({ name: 'role', enum: UserRole, isArray: true })
  @ApiQuery({ name: 'email' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get(':id')
  getUserInfo(
    @Param('id', ParseIntPipe) id: number,
    @Query(new ValidationPipe()) filter: string,
  ) {
    return this.userService.findUser({ where: { id } });
  }

  @Get()
  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  @ApiBody({ type: CreateUserDto })
  async createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Promise<UserEntity> {
    return this.userService.createUser({
      name: createUserDto.name,
      email: createUserDto.email,
      phone: createUserDto.phone,
      // age: createUserDto.age,
    });
  }

  @Patch('/:id')
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: UserEntity,
  })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(id, {
      name: updateUserDto.name,
      email: updateUserDto.email,
      phone: updateUserDto.phone,
      age: updateUserDto.age,
    });
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of photos',
    type: FileUploadDto,
  })
  @Put('upload/photo')
  uploadFile(@UploadedFile() file) {
    return { success: true };
  }
}
