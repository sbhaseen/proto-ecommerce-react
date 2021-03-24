import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ default: 0 })
  stockQty: number;

  @Prop({ required: true })
  price: number;

  @Prop()
  image: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
