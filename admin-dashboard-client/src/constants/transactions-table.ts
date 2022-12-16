import { GridColumns } from "@mui/x-data-grid";
import { Column } from "../types";
import moment from "moment";

export const transactionsTable: GridColumns<Column> = [
  {
    field: "user",
    headerName: "Name",
    flex: 1,
    renderCell: (params) => params.value?.name,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    flex: 1,
    renderCell: (params) => moment(params.value).format("DD-MM-YYYY"),
  },
  {
    field: "products",
    headerName: "# of Products",
    flex: 1,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: "cost",
    headerName: "Cost",
    flex: 1,
    renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
  },
];
