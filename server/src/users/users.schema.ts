import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Gender } from 'src/constants/enums/Gender.enum';

@Schema()
export class Users {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop({ enum: Object.values(Gender), default: Gender.Male })
  gender: Gender;

  @Prop()
  email: string;

  @Prop()
  username: string;

  @Prop()
  profile_picture: string;

  @Prop()
  password: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
