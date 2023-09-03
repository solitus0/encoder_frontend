import { createContext } from "react";
import { PaginatedMedia, Setting, Permissions } from "./types";

const AppContext = createContext({
  directory: "",
  setDirectory: (directory: string) => {},
  tempDirectory: "",
  setTempDirectory: (tempDirectory: string) => {},
  data: {} as PaginatedMedia,
  setData: (data: any) => {},
  currentlyEncoding: "",
  setCurrentlyEncoding: (currentlyEncoding: string) => {},
  settings: [] as Setting[],
  setSettings: (settings: Setting[]) => {},
  sortModel: [] as any,
  setSortModel: (sortModel: any) => {},
  filterModel: {} as any,
  setFilterModel: (filterModel: any) => {},
  columnVisibilityModel: [] as any,
  setColumnVisibilityModel: (columnVisibilityModel: any) => {},
  paginationModel: {} as any,
  setPaginationModel: (paginationModel: any) => {},
  rowSelection: [] as any,
  setRowSelection: (rowSelection: any) => {},
  permissions: {} as Permissions,
  setPermissions: (permissions: Permissions) => {},
});

export default AppContext;
