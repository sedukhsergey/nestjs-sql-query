import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from './user-role.enum';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: 'The name of a user',
    default: 'Bob',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    description: 'The age of a user',
    default: 18,
    minimum: 18,
    type: Number,
  })
  @IsNumber()
  age: number;

  @ApiProperty({ type: [String], default: ['mq', 'ds'] })
  @IsArray()
  capabilities: string[];

  @ApiProperty({ enum: ['Admin', 'Moderator', 'User'] })
  @IsEnum(UserRole)
  role: UserRole;
}
