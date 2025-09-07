import { Schema, model, Document, Types } from 'mongoose';

export interface IReview {
  user: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IProduct extends Document {
  name: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  features: string[];
  reviews: IReview[];
}

const ReviewSchema = new Schema<IReview>({
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, min: 0 },
  features: [{ type: String }],
  reviews: [ReviewSchema]
}, {
  timestamps: true
});

export default model<IProduct>('Product', ProductSchema);