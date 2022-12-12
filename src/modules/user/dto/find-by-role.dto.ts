import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRole } from './user-role.enum';
import { BusinessEnum } from './business.enum';

export class FindByRoleDto {
  @ApiProperty({
    description: 'List of enums',
    isArray: true,
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsEnum(UserRole, { each: true })
  role: UserRole[];

  @ApiProperty({
    description: 'List of enums',
    enum: BusinessEnum,
    enumName: 'BusinessEnum',
  })
  @IsEnum(BusinessEnum)
  business: BusinessEnum;
}
