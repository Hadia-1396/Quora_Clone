import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { User } from 'src/users/users.interface';

export class createdTopicDto {
  @IsString()
  @MaxLength(15)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  user: User;
}
