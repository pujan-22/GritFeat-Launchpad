import { Router } from 'express';
import {
  createOrder,
  getOrders,
  getCustomerOrders,
  updateOrderStatus
} from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/customer/:customerId', getCustomerOrders);
router.patch('/:id/status', updateOrderStatus);

export default router;