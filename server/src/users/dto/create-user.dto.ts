import { Gender } from 'src/constants/enums/Gender.enum';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsEnum(Gender, {
    message: 'Gender must be either male or female',
  })
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  profile_picture: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
