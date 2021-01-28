import {IsNumber, IsOptional, IsPositive, IsString, MaxLength} from 'class-validator';

export class City {
  @IsString()
  @IsOptional()
  id?: string;
  @IsString()
  @MaxLength(92)
  name: string;
  @IsNumber()
  @IsPositive()
  temperature: number;
  @IsString()
  @MaxLength(92)
  country: string;

}
