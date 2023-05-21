import express from 'express';
import { body } from 'express-validator';
import { addproduct, deleteProduct, getProductById, getProducts } from '../controllers/productController.js';

const productsRouter = express.Router();
// Add Product to database
productsRouter.post('/add',
  [
    body('name').notEmpty().withMessage('Product Name is Required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('quantity').notEmpty().withMessage('Quantity is required'),
    body('price').notEmpty().isDecimal().withMessage('Price is required'),
    body('expiryDate').notEmpty().isDate().withMessage('Expiry Date is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('brand').notEmpty().withMessage('Brand is required')
  ],
  addproduct
);

productsRouter.get('/', getProducts);

productsRouter.get('/:id', getProductById);

productsRouter.delete('/:id', deleteProduct);

export default productsRouter;

