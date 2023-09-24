import { useEffect } from "react";
import axiosInstance from "./../axiosInstance";

export function useFetchPermissions(setPermissions: any) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/api/permissions`);
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        setPermissions(response.data);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };

    fetchData();
  }, []);
}
