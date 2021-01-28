import {IsOptional, IsString, MaxLength} from 'class-validator';

export class Landmark {
  @IsString()
  @IsOptional()
  id?: string;
  @IsString()
  @MaxLength(92)
  name: string;
  @IsString()
  @MaxLength(46)
  country: string;
}
