import { Document } from 'mongoose';
import { Gender } from 'src/constants/enums/Gender.enum';

export interface User extends Document {
  name: string;
  age: number;
  gender: Gender;
  email: string;
  username: string;
  profile_picture: string;
}
