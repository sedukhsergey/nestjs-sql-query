import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { UserRole } from './user-role.enum';
import { Expose } from "class-transformer";

export class CreateUserDto {
  @Expose()
  @ApiProperty({
    description: 'The name of a user',
    default: 'Bob',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Expose()
  @ApiProperty({
    description: 'The phone of a user',
  })
  // @IsPhoneNumber()
  @IsString()
  @IsNotEmpty()
  phone: string;

  @Expose()
  @ApiPropertyOptional({
    description: 'The age of a user',
    default: 18,
    minimum: 18,
    type: Number,
  })
  @IsNumber()
  age: number;

  // @ApiProperty({ type: [String], default: ['mq', 'ds'] })
  // @IsArray()
  // capabilities: string[];
  //
  // @ApiProperty({ enum: ['Admin', 'Moderator', 'User'] })
  // @IsEnum(UserRole)
  // role: UserRole;
}
