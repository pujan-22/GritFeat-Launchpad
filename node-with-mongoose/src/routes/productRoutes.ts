import { Router } from 'express';
import {
  createProduct,
  getProducts,
  addReview,
  updateProduct,
  deleteProduct,
  updateReview,
  deleteReview
} from '../controllers/productController';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.post('/:id/reviews', addReview);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.put('/:productId/reviews/:reviewId', updateReview);
router.delete('/:productId/reviews/:reviewId', deleteReview);

export default router;