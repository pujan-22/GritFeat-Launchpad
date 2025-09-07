import { Router } from 'express';
import {
  getSalesRevenue,
  getTopSellingProducts,
  getMonthlySales
} from '../controllers/reportController';

const router = Router();

router.get('/sales-revenue', getSalesRevenue);
router.get('/top-selling-products', getTopSellingProducts);
router.get('/monthly-sales', getMonthlySales);

export default router;