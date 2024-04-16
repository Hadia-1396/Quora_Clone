import { Document, Types } from 'mongoose';

export interface Topic extends Document {
  title: string;
  description: string;
  user: Types.ObjectId;
}
