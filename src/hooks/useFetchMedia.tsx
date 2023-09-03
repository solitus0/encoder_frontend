import { useEffect, useContext } from "react";
import axiosInstance from "./../axiosInstance";
import AppContext from "./../AppContext";
import { Order } from "./../types";
import {
  GridFilterModel,
  GridSortModel,
  GridPaginationModel,
  GridColumnVisibilityModel,
} from "@mui/x-data-grid";

export function useFetchMedia(
  sortModel: GridSortModel,
  filterModel: GridFilterModel,
  paginationModel: GridPaginationModel,
  columnVisibilityModel: GridColumnVisibilityModel
) {
  const { setData } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { page, pageSize } = paginationModel;

        const queryParams = new URLSearchParams({
          page: String(page + 1),
          pageSize: pageSize.toString(),
        });

        if (sortModel.length > 0) {
          const { field, sort } = sortModel[0];
          queryParams.append("orderBy", field);
          queryParams.append("orderDirection", sort as Order);
        }

        if (filterModel.items.length > 0) {
          const { field, operator, value } = filterModel.items[0];
          if (value) {
            queryParams.append("field", field);
            queryParams.append("value", value as string);
            queryParams.append("operator", operator as string);
          }
        }

        const response = await axiosInstance.get(
          `/api/media?${queryParams.toString()}`
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        setData(response.data);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };

    fetchData();
  }, [sortModel, filterModel, paginationModel, columnVisibilityModel]);
}
