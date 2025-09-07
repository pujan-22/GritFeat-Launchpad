import { Schema, model, Document, Types } from 'mongoose';

export interface IOrderItem {
  product_id: Types.ObjectId;
  quantity: number;
  unit_price: number;
}

export interface IOrder extends Document {
  customer_id: Types.ObjectId;
  order_date: Date;
  items: IOrderItem[];
  status: string;
  total_amount: number;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  unit_price: { type: Number, required: true }
});

const OrderSchema = new Schema<IOrder>({
  customer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  order_date: { type: Date, default: Date.now },
  items: [OrderItemSchema],
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  total_amount: { type: Number, required: true }
}, {
  timestamps: true
});

export default model<IOrder>('Order', OrderSchema);