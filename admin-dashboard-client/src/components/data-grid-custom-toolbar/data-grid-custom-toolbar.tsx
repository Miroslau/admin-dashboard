import React, { FC, SyntheticEvent } from "react";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
} from "@mui/x-data-grid";
import FlexBetween from "../section-components/flex-between/flex-between";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

interface DataGridCustomToolbar {
  searchInput: string;
  setSearchInput: (arg: string) => void;
  setSearch: (arg: string) => void;
}

const DataGridCustomToolbar: FC<DataGridCustomToolbar> = ({
  searchInput,
  setSearchInput,
  setSearch,
}) => {
  const onChangeHandler = (event: SyntheticEvent): void =>
    setSearchInput((event.target as HTMLInputElement).value);

  const handleClick = (): void => {
    setSearch(searchInput);
    setSearchInput("");
  };

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Search"
          sx={{ mb: "0.5rem", width: "15rem" }}
          onChange={onChangeHandler}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClick}>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
