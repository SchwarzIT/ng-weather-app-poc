import {IsEmail, IsOptional, IsString, MaxLength} from 'class-validator';

export class User {
  @IsOptional()
  @IsString()
  id?: string;
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
