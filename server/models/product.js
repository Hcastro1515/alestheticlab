import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    quantity: {
      type: Number,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    expiryDate: {
      type: Date
    },
    supplier: {
      type: String,
      require: true
    },
    category: {
      type: String,
      require: true
    },
    brand: {
      type: String,
      require: true
    }
  },
  {
    timestamp: true
  }
);

const product = mongoose.model('Product', productSchema);
export default product; 
