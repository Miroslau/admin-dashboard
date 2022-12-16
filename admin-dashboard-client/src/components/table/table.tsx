import React, { FC } from "react";
import { Box, useTheme } from "@mui/material";
import { Column } from "../../types";
import { DataGrid, GridColumns, GridFeatureMode } from "@mui/x-data-grid";

interface TableProps<T> {
  style?: {};
  columns: GridColumns<Column>;
  isLoading?: boolean;
  data: Array<T> | undefined;
  height?: string;
  pt?: string;
  rowCount?: number;
  rowsPerPageOptions?: number[];
  pagination?: true;
  page?: number;
  pageSize?: number;
  paginationMode?: GridFeatureMode;
  sortingMode?: GridFeatureMode;
  onPageChange?: (arg: number) => void;
  onPageSizeChange?: (arg: number) => void;
  onSortModelChange?: (arg: any) => void;
  components?: {
    [key: string]: React.FC | any;
  };
  componentsProps?: {
    [key: string]: any;
  };
}

const Table: FC<TableProps<any>> = ({
  style,
  columns,
  isLoading,
  data,
  height,
  pt,
  rowCount = 0,
  rowsPerPageOptions = [],
  pagination,
  page = 0,
  pageSize = 0,
  paginationMode = "server",
  sortingMode = "server",
  onPageChange,
  onPageSizeChange,
  onSortModelChange,
  components,
  componentsProps,
}) => {
  return (
    <Box pt={pt} height={height} sx={style}>
      <DataGrid
        columns={columns}
        rows={data || []}
        getRowId={(row) => row._id}
        loading={isLoading || !data}
        rowCount={rowCount}
        rowsPerPageOptions={rowsPerPageOptions}
        pagination={pagination}
        page={page}
        pageSize={pageSize}
        paginationMode={paginationMode}
        sortingMode={sortingMode}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onSortModelChange={onSortModelChange}
        components={components}
        componentsProps={componentsProps}
      />
    </Box>
  );
};

export default Table;
