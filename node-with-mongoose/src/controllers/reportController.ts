import { Request, Response } from 'express';
import Order from '../models/Order';

// Task 15: Generate Sales Revenue Report
export const getSalesRevenue = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$total_amount' } } }
    ]);
    
    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
    res.json({ totalRevenue });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Task 16: Generate Top-Selling Products Report
export const getTopSellingProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product_id',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.unit_price'] } }
        }
      },
      { $sort: { totalQuantity: -1 } },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          productName: '$product.name',
          totalQuantity: 1,
          totalRevenue: 1
        }
      }
    ]);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Task 17: Generate Monthly Sales Report
export const getMonthlySales = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Order.aggregate([
      { $match: { status: 'completed' } },
      {
        $group: {
          _id: {
            year: { $year: '$order_date' },
            month: { $month: '$order_date' }
          },
          totalSales: { $sum: '$total_amount' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          totalSales: 1,
          orderCount: 1
        }
      }
    ]);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};