import React from "react";

export type RouteType = {
  path: string;
  Component: React.FC | any;
};

export type User = {
  name: string;
  email: string;
  password: string;
  city?: string;
  state?: string;
  country?: string;
  occupation?: string;
  phoneNumber?: string;
  transactions?: [];
  role: string;
};

interface Sales {
  totalSales?: number;
  totalUnits?: number;
}

interface Month extends Sales {
  month?: string;
}

interface DailyData extends Sales {
  date?: string;
}

type Stat = {
  productId?: string;
  yearlySalesTotal?: number;
  yearlyTotalSoldUnits?: number;
  year?: number;
  monthlyData?: Array<Month>;
  dailyData?: Array<DailyData>;
};

export type Products = {
  _id?: string;
  name?: string;
  price?: number;
  description?: string;
  category?: string;
  rating?: number;
  supply?: number;
  stat?: Array<Stat>;
};
