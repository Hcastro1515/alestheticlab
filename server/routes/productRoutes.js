import express from 'express';
import { body, validationResult } from 'express-validator';
import product from '../models/product.js';


const productsRouter = express.Router();

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
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, quantity, price, expiryDate, category, brand } = req.body;

    try {
      const productExists = await product.findOne({ name, brand });
      console.log(productExists);
      if (productExists) {
        return res.status(404).json({ message: "Product is already in database" });
      }
      product.create({
        name,
        description,
        quantity,
        price,
        expiryDate,
        category,
        brand
      })
      return res.status(200).json({ message: "Product was successfully added" });

      // Rest of your code
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });

export default productsRouter;

