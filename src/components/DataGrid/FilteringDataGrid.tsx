import AppContext from "../../AppContext";
import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridToolbar,
  GridSortModel,
  GridColumnVisibilityModel,
  GridRowSelectionModel,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { useFetchMedia } from "../../hooks/useFetchMedia";
import { mediaSample, Media, tableSize } from "../../types";

export function FilteringDataGrid() {
  const {
    filterModel,
    setFilterModel,
    paginationModel,
    setSortModel,
    setColumnVisibilityModel,
    columnVisibilityModel,
    sortModel,
    setPaginationModel,
    data,
    rowSelection,
    setRowSelection,
  } = React.useContext(AppContext);

  function createHeadCell({
    field,
    headerName,
    type,
    width,
    filterable,
  }: GridColDef) {
    return { field, headerName, type, width, filterable };
  }

  function createColumns(): GridColDef[] {
    const allColumns = Object.keys(mediaSample) as (keyof Media)[];
    return allColumns.map((column) =>
      createHeadCell({
        field: column,
        headerName: column,
        type: typeof mediaSample[column],
        width: tableSize[column],
        filterable: true,
      })
    );
  }

  useFetchMedia(sortModel, filterModel, paginationModel, columnVisibilityModel);

  const handleFilterChange = (model: GridFilterModel) => {
    setFilterModel(model);
  };

  const handleSortChange = (model: GridSortModel) => {
    setSortModel(model);
  };

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  const handleColumnVisibilityChange = (model: GridColumnVisibilityModel) => {
    setColumnVisibilityModel(model);
  };

  const handleRowSelectionChange = (model: GridRowSelectionModel) => {
    setRowSelection(model);
  };

  return (
    <div style={{ height: 1200, width: "100%" }}>
      <DataGrid
        rows={data.items}
        getRowId={(row) => row.uuid}
        columns={createColumns()}
        filterMode="server"
        sortingMode="server"
        paginationMode="server"
        onFilterModelChange={(model) => handleFilterChange(model)}
        filterModel={filterModel}
        sortModel={sortModel}
        onSortModelChange={(model) => handleSortChange(model)}
        paginationModel={paginationModel}
        onPaginationModelChange={(model) => handlePageChange(model)}
        columnVisibilityModel={columnVisibilityModel}
        onColumnVisibilityModelChange={(model) =>
          handleColumnVisibilityChange(model)
        }
        disableDensitySelector
        checkboxSelection
        disableRowSelectionOnClick
        rowSelectionModel={rowSelection}
        onRowSelectionModelChange={(model) => handleRowSelectionChange(model)}
        rowCount={data.totalItems}
        slots={{
          toolbar: GridToolbar,
        }}
        autoPageSize={true}
      />
    </div>
  );
}
