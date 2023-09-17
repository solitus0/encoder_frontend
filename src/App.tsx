import React from "react";
import { CssBaseline, ThemeProvider, createTheme, Grid } from "@mui/material";

import ScanButton from "./components/Buttons/ScanButton";
import Settings from "./DirectoryInput";
import AppContext from "./AppContext";
import SSEComponent from "./SSEComponent";
import HealthCheck from "./components/HealthCheck";
import { Setting, Permissions, Preset, PaginatedMedia, Encode } from "./types";
import Container from "@mui/material/Container";
import { useLocalStorageState } from "./hooks/useLocalStorageState";
import { FilteringDataGrid } from "./components/DataGrid/FilteringDataGrid";
import {
  GridFilterModel,
  GridSortModel,
  GridColumnVisibilityModel,
  GridPaginationModel,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import SplitButton from "./components/Buttons/ActionButton";
import ClearQueueButton from "./components/Buttons/ClearQueueButton";
import { useFetchPermissions } from "./hooks/useFetchPermissions";
import { EncodeModal } from "./components/EncodeModal";
const theme = createTheme();

function App() {
  const [directory, setDirectory] = React.useState<string>("");
  const [tempDirectory, setTempDirectory] = React.useState<string>("");
  const [currentlyEncoding, setCurrentlyEncoding] = React.useState<string>("");
  const [settings, setSettings] = React.useState<Setting[]>([]);
  const [rowSelection, setRowSelection] = React.useState<GridRowSelectionModel>(
    []
  );
  const [presets, setPresets] = React.useState<Preset[]>([]);
  const [action, setAction] = React.useState("encode");

  const [data, setData] = React.useState<PaginatedMedia>({
    items: [],
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: 0,
  });

  const [sortModel, setSortModel] = useLocalStorageState<GridSortModel>(
    "sortModel",
    []
  );
  const [filterModel, setFilterModel] = useLocalStorageState<GridFilterModel>(
    "filterModel",
    {
      items: [
        {
          field: "name",
          operator: "contains",
          value: "",
        },
      ],
    }
  );

  const [permissions, setPermissions] = React.useState<Permissions>({
    scan: false,
    encode: false,
    scan_path: false,
    temp_path: false,
    rabbitmq: false,
  });

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useLocalStorageState<GridColumnVisibilityModel>(
      "columnVisibilityModel",
      {}
    );

  const [selectedActionIndex, setSelectedActionIndex] = useLocalStorageState(
    "selectedActionIndex",
    0
  );

  const [paginationModel, setPaginationModel] =
    useLocalStorageState<GridPaginationModel>("paginationModel", {
      page: 0,
      pageSize: 15,
    });

  const [openEncodeModal, setOpenEncodeModal] = React.useState(false);
  const [encodes, setEncodes] = React.useState<Encode[]>([]);
  const [refreshQueued, setRefreshQueued] = React.useState<boolean>(false);

  useFetchPermissions(settings, setPermissions);

  return (
    <AppContext.Provider
      value={{
        directory,
        setDirectory,
        tempDirectory,
        setTempDirectory,
        data,
        setData,
        currentlyEncoding,
        setCurrentlyEncoding,
        settings,
        setSettings,
        sortModel,
        setSortModel,
        filterModel,
        setFilterModel,
        columnVisibilityModel,
        setColumnVisibilityModel,
        paginationModel,
        setPaginationModel,
        rowSelection,
        setRowSelection,
        permissions,
        setPermissions,
        action,
        setAction,
        presets,
        setPresets,
        openEncodeModal,
        setOpenEncodeModal,
        selectedActionIndex,
        setSelectedActionIndex,
        encodes,
        setEncodes,
        refreshQueued,
        setRefreshQueued,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="xl">
          <SSEComponent />
          <EncodeModal />

          <Grid container p={2} justifyContent={"space-between"}>
            <Grid item xs={3}>
              <ScanButton />
            </Grid>
            <Grid item xs={3}>
              <ClearQueueButton />
            </Grid>
            <Grid item xs={6}>
              <HealthCheck />
            </Grid>
          </Grid>

          <Grid container p={2} gap={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <SplitButton />
              </Grid>
              <Grid item xs={12}>
                <FilteringDataGrid />
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Settings />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
