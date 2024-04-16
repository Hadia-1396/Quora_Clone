import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Topics extends Document {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Users' })
  user: Types.ObjectId;
}

export const TopicsSchema = SchemaFactory.createForClass(Topics);

TopicsSchema.pre('save', async function (next) {
  try {
    if (typeof this.user === 'string') {
      this.user = new Types.ObjectId(this.user);
    }
    next();
  } catch (error) {
    next(error);
  }
});
