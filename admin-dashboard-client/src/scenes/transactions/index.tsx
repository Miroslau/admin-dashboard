import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { useGetTransactionsQuery } from "../../store/state/api/api";
import Header from "../../components/section-components/header/Header";
import Loader from "../../components/loader/loader";
import Modal from "../../components/modal/modal";
import Table from "../../components/table/table";
import DataGridCustomToolbar from "../../components/data-grid-custom-toolbar/data-grid-custom-toolbar";
import { Transaction } from "../../types";
import { transactionsTable } from "../../constants/transactions-table";

const Transactions = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const transactions = data?.transactions as Transaction[];

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
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Table
        columns={transactionsTable}
        data={transactions}
        style={tableStyle}
        height="80vh"
        rowCount={(data && data?.total) || 0}
        rowsPerPageOptions={[20, 50, 100]}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        sortingMode="server"
        onPageChange={(newPage: number) => setPage(newPage)}
        onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
        onSortModelChange={(newSortModel: any) => {
          const lastSortModel = { ...newSortModel };
          setSort(lastSortModel);
        }}
        components={{ Toolbar: DataGridCustomToolbar }}
        componentsProps={{
          toolbar: { searchInput, setSearchInput, setSearch },
        }}
      />
    </Box>
  );
};

export default Transactions;
