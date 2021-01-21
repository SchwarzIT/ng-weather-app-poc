import {IsNumber, IsString, MaxLength} from 'class-validator';

export class Country {
  @IsString()
  id: string;
  @IsString()
  @MaxLength(92)
  name: string;
  @IsString()
  @MaxLength(46)
  iso: string;
}
