import { Schema, model } from "mongoose";

interface IProduct {
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  rating?: string;
  supply?: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", ProductSchema);

export default Product;
