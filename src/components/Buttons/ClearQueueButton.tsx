import React, { useContext } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import AppContext from "../../AppContext";
import { GridPaginationModel } from "@mui/x-data-grid";
import axiosInstance from "../../axiosInstance";
import { Encode } from "../../types";
import Badge from "@mui/material/Badge";

export default function ClearQueueButton() {
  const [loading, setLoading] = React.useState(false);
  const {
    permissions,
    setPaginationModel,
    encodes,
    setEncodes,
    refreshQueued,
  } = useContext(AppContext);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`api/encodes/queued`);
        const data: Encode[] = response.data;
        setEncodes(data);
      } catch (error) {
        console.error("Error fetching encodes:", error);
      }
    };

    fetchData();
  }, [refreshQueued]);

  const handleOnClick = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.delete(`api/encodes/queued`);
      if (response.status !== 204) {
        throw new Error("Network response was not ok");
      }
      setEncodes([]);
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
      <Badge badgeContent={encodes.length} color="secondary">
        <LoadingButton
          loading={loading}
          variant="outlined"
          onClick={handleOnClick}
          size="large"
          color="secondary"
          disabled={permissions.encode === false}
          fullWidth
        >
          Clear queue
        </LoadingButton>
      </Badge>
    </Stack>
  );
}
