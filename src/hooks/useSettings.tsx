import { useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { Setting } from "../types";

export function useSettings(setSettings: any, refreshSettings: boolean) {
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axiosInstance.get<Setting[]>("/api/settings");
        const paths = response.data;

        setSettings(paths);
      } catch (error) {
        console.error("Error fetching the settings:", error);
      }
    };

    fetchSettings();
  }, [refreshSettings]);
}
