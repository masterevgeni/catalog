import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CatalogDocument = Catalog & Document;

@Schema()
export class Catalog {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, enum: ['fashion', 'home', 'general'] })
  vertical: string;

  @Prop({ default: false })
  primary: boolean;

  @Prop({ type: Date })
  indexedAt?: Date;

  @Prop({ type: String, enum: ['not_started', 'running', 'failed', 'completed'], default: 'not_started' })
  indexingStatus?: string;

  @Prop({ type: Date })
  scheduledAt?: Date;

  @Prop({ type: Date })
  completedAt?: Date;

  @Prop({ type: String })
  errorDetails?: string;

  _id?: Types.ObjectId;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);