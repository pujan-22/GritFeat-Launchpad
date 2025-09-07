import { Request, Response } from 'express';
import Order, { IOrder } from '../models/Order';
import Product from '../models/Product';
import User from '../models/User';

// Task 11: Place a New Order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const session = await Order.startSession();
  session.startTransaction();
  
  try {
    const { customerId, items } = req.body;
    
    // Validate customer exists
    const customer = await User.findById(customerId);
    if (!customer) {
      res.status(404).json({ error: 'Customer not found' });
      return;
    }
    
    let totalAmount = 0;
    const orderItems = [];
    
    // Validate products and check stock
    for (const item of items) {
      const product = await Product.findById(item.productId).session(session);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }
      
      if (product.stock < item.quantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }
      
      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;
      
      orderItems.push({
        product_id: product._id,
        quantity: item.quantity,
        unit_price: product.price
      });
      
      // Decrease stock
      product.stock -= item.quantity;
      await product.save({ session });
    }
    
    // Create order
    const order: IOrder = new Order({
      customer_id: customerId,
      items: orderItems,
      total_amount: totalAmount,
      status: 'pending'
    });
    
    const savedOrder = await order.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    res.status(201).json(savedOrder);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    res.status(400).json({ error: (error as Error).message });
  }
};

// Task 12: List and Filter Orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.query;
    const filter: any = {};
    
    if (status) filter.status = status;
    
    const orders = await Order.find(filter)
      .populate('customer_id', 'username email')
      .populate('items.product_id', 'name price');
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Task 13: Get All Orders for a Specific Customer
export const getCustomerOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { customerId } = req.params;
    
    const orders = await Order.find({ customer_id: customerId })
      .populate('items.product_id', 'name price');
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Task 14: Update Order Status (Cancel or Complete)
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  const session = await Order.startSession();
  session.startTransaction();
  
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id).session(session);
    
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    
    // If changing to cancelled, restore stock
    if (order.status !== 'cancelled' && status === 'cancelled') {
      for (const item of order.items) {
        const product = await Product.findById(item.product_id).session(session);
        if (product) {
          product.stock += item.quantity;
          await product.save({ session });
        }
      }
    }
    
    order.status = status;
    const updatedOrder = await order.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    res.json(updatedOrder);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    
    res.status(400).json({ error: (error as Error).message });
  }
};