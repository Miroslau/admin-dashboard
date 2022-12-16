import mongoose, { Schema } from "mongoose";

interface ITransaction {
  userId?: string;
  cost?: string;
  products?: string[];
}

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
