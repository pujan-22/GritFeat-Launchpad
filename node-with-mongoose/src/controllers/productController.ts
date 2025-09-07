import { Request, Response } from 'express';
import Product, { IProduct } from '../models/Product';

// Task 6: Create a New Product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: IProduct = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Task 7: Comprehensive Product Search and Filtering
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      maxStock,
      hasReviews
    } = req.query;

    const filter: any = {};

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice as string);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice as string);
    }
    if (maxStock) filter.stock = { $lte: parseInt(maxStock as string) };
    if (hasReviews !== undefined) {
      if (hasReviews === 'true') {
        filter.reviews = { $not: { $size: 0 } };
      } else {
        filter.reviews = { $size: 0 };
      }
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Task 8: Add a Review to a Product
export const addReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    
    product.reviews.push({
        user, rating, comment,
        createdAt: undefined
    });
    const updatedProduct = await product.save();
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Task 9: Update Product Details
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Task 10: Delete a Product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Task 18: Update a Product Review
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    
    const review = product.reviews.id(reviewId);
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Task 19: Delete a Product Review
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, reviewId } = req.params;
    
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    
    const review = product.reviews.id(reviewId);
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
      return;
    }
    
    review.deleteOne();
    const updatedProduct = await product.save();
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};