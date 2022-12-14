import { RouteType } from "../types";
import { CUSTOMERS, DASHBOARD, PRODUCTS } from "../constants/routes";
import Dashboard from "../scenes/dashboard/dashboard";
import Products from "../scenes/products/products";
import Customers from "../scenes/customers";

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
];

export default routes;
