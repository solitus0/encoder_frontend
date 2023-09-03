import React, { useContext } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import AppContext from "../../AppContext";
import { GridPaginationModel } from "@mui/x-data-grid";
import axiosInstance from "./../../axiosInstance";

export default function ScanButton() {
  const [loading, setLoading] = React.useState(false);
  const { permissions, setPaginationModel } = useContext(AppContext);

  const handleOnClick = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.post(`/api/scan`);
      if (response.status !== 204) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was an error:", error);
    } finally {
      setPaginationModel((prev: GridPaginationModel) => ({
        pageSize: prev.pageSize,
        page: 1,
      }));

      setLoading(false);
    }
  };

  return (
    <Stack direction="row" spacing={3}>
      <LoadingButton
        loading={loading}
        loadingPosition="start"
        startIcon={<ImageSearchIcon />}
        variant="outlined"
        onClick={handleOnClick}
        size="large"
        color="secondary"
        disabled={permissions.scan === false}
        fullWidth
      >
        Scan
      </LoadingButton>
    </Stack>
  );
}
