import { useEffect } from "react";
import axiosInstance from "./../axiosInstance";
import { Setting } from "./../types";

export function useFetchPermissions(settings: Setting[], setPermissions: any) {
  useEffect(() => {
    const fetchData = async () => {
      if (!settings.length) return;

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
  }, [settings]);
}
