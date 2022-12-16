import React from "react";
import { Box, useTheme } from "@mui/material";
import { useGetCustomersQuery } from "../../store/state/api/api";
import Header from "../../components/section-components/header/Header";
import Modal from "../../components/modal/modal";
import Loader from "../../components/loader/loader";
import Table from "../../components/table/table";
import { customersTable } from "../../constants/customers-table";

const Customers = () => {
  const { data, isLoading } = useGetCustomersQuery();
  const theme = useTheme();

  const tableStyle = {
    "& .MuiDataGrid-root": {
      border: "none",
    },
    "& .MuiDataGrid-cell": {
      borderBottom: "none",
    },
    "& .MuiDataGrid-columnHeaders": {
      // @ts-ignore
      backgroundColor: theme.palette.background.alt,
      // @ts-ignore
      color: theme.palette.secondary[100],
      borderBottom: "none",
    },
    "& .MuiDataGrid-virtualScroller": {
      backgroundColor: theme.palette.primary.light,
    },
    "& .MuiDataGrid-footerContainer": {
      // @ts-ignore
      backgroundColor: theme.palette.background.alt,
      // @ts-ignore
      color: theme.palette.secondary[100],
      borderTop: "none",
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      // @ts-ignore
      color: `${theme.palette.secondary[200]} !important`,
    },
  };

  return (
    <Box p="1.5rem 2.5rem">
      {isLoading && (
        <Modal>
          <Loader />
        </Modal>
      )}
      <Header title="CUSTOMERS" subtitle="List of Customers" />
      <Table
        columns={customersTable}
        data={data}
        style={tableStyle}
        pt="40px"
        height="75vh"
      />
    </Box>
  );
};

export default Customers;
