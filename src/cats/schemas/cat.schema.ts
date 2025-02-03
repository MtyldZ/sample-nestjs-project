import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Cat>;

@Schema()
export class Cat {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop(String)
  name: string;

  @Prop(Number)
  age: number;

  @Prop(String)
  breed: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }],
    default: [],
  })
  parents: Cat[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cat' }],
    default: [],
  })
  children: Cat[];

  @Prop({ type: mongoose.Schema.Types.Map, default: {} })
  attributes: Record<string, any>;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
