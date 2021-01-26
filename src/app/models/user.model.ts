import {IsEmail, IsOptional, IsString, MaxLength} from 'class-validator';

export class User {
  @IsOptional()
  @IsString()
  picture?: string;
  @IsString()
  @MaxLength(92)
  name: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(64)
  email?: string;
}
