import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, MinLength } from 'class-validator';
import { Any } from 'typeorm';

export class CreateUserDto {
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
