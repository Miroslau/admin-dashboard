import { Schema, model } from "mongoose";

interface ISales {
  totalSales?: number;
  totalUnits?: number;
}

interface IMonth extends ISales {
  month?: string;
}

interface IDailyData extends ISales {
  date?: string;
}

interface IProductState {
  productId?: string;
  yearlySalesTotal?: number;
  yearlyTotalSoldUnits?: number;
  year?: number;
  monthlyData?: Array<IMonth>;
  dailyData?: Array<IDailyData>;
}

const ProductStatSchema = new Schema<IProductState>(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  { timestamps: true }
);

const ProductStat = model<IProductState>("ProductStat", ProductStatSchema);

export default ProductStat;
