import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.createProduct);

router.get('/:ProductId', ProductControllers.getSingleProduct);

router.delete('/:ProductId', ProductControllers.deleteProduct);

router.put('/:ProductId', ProductControllers.updateProduct);

router.get('/', ProductControllers.getAllProducts);

export const ProductRoutes = router;