import { RouteType } from "../types";
import { DASHBOARD } from "../constants/routes";
import Dashboard from "../scenes/dashboard/dashboard";

const routes: RouteType[] = [
  {
    path: DASHBOARD,
    Component: Dashboard,
  },
];

export default routes;
