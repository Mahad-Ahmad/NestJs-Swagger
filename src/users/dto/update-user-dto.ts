import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user-dto';
import { ApiProperty } from '@nestjs/swagger';
import { Any } from 'typeorm';
import { IsEnum, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: Any })
  @MinLength(3)
  name?: string;

  @ApiProperty({ type: Any })
  email: string;

  @ApiProperty({ type: Any })
  password: string;

  @ApiProperty({ type: Any })
  @IsEnum(['true', 'false'], { message: 'Please add correct admin type' })
  admin: 'true' | 'false';
}
