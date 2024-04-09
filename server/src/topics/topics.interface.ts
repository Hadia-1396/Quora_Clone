import { Document } from 'mongoose';
import { User } from 'src/users/users.interface';

export interface Topic extends Document {
  title: string;
  description: string;
  user: User;
}
