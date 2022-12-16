import { RouteType } from "../types";
import {
  CUSTOMERS,
  DASHBOARD,
  PRODUCTS,
  TRANSACTIONS,
} from "../constants/routes";
import Dashboard from "../scenes/dashboard/dashboard";
import Products from "../scenes/products/products";
import Customers from "../scenes/customers";
import Transactions from "../scenes/transactions";

const routes: RouteType[] = [
  {
    path: DASHBOARD,
    Component: Dashboard,
  },
  {
    path: PRODUCTS,
    Component: Products,
  },
  {
    path: CUSTOMERS,
    Component: Customers,
  },
  {
    path: TRANSACTIONS,
    Component: Transactions,
  },
];

export default routes;
