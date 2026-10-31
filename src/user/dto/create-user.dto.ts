import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the user' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
    required: false,
  })
  @IsString()
  @IsOptional()
  phone?: string;
}
