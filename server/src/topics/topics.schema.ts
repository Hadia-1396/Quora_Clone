import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/users.interface';

@Schema()
export class Topics extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Users' })
  user: User;
}

export const TopicsSchema = SchemaFactory.createForClass(Topics);
