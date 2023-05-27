import { validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import product from '../models/product.js';


//Add product
const addProduct = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({ status: 400, errors: errors.array() });
  }

  const { name, description, quantity, price, expiryDate, category, brand } = req.body;

  try {
    const productExists = await product.findOne({ name, brand });

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
    next(err);
  }
});

//Get all products 
const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await product.find();

    if (!products || products.length === 0) {
      res.status(404).json({
        message: "No products found",
      });
    } else {
      res.status(200).json({
        message: "Products retrieved successfully",
        data: products
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while retrieving the products",
    });
  }
});

//Get product by ID 
const getProductById = asyncHandler(async (req, res) => {
  try {
    const singleProduct = await product.findOne({ _id: req.params.id });

    if (!singleProduct) {
      res.status(404).json({
        message: "Product not found"
      });
    } else {
      res.status(200).json({
        message: "Product was retrieve successfully",
        data: singleProduct
      })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Ann error occurred trying to retrieve the product",
    });
  }
});

//Update product
const updateProductById = asyncHandler(async (req, res) => {
  try {
    const _product = await product.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });

    if (!_product) {
      res.status(404).json({
        message: "Product not found"
      });
    } else {
      res.status(200).json({
        message: "Product was successfully updated",
        data: _product
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while updating the product",
    });
  }
});

//Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const singleProduct = await product.deleteOne({ _id: req.params.id });

    if (singleProduct.deletedCount === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }
    res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "There was an error deleting the product",
    });
  }
});

const deleteAllProducts = asyncHandler(async (req, res) => {
  try {
    console.log("Deleting all products");
    const deleteResult = await product.deleteMany({});

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        message: "No products found",
      });
    }
    res.status(200).json({
      message: `Successfully deleted all ${result.deletedCount} products.`,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: error,
      message: "There was an error deleting the products",
    });
  }
});

export {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProductById,
  deleteAllProducts
}
