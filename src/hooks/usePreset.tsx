import { useEffect, useContext } from "react";
import axiosInstance from "./../axiosInstance";
import AppContext from "./../AppContext";
import { Preset } from "../types";

export function usePreset() {
  const { setPresets } = useContext(AppContext);

  useEffect(() => {
    const fetchPresets = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(apiUrl + "/api/presets");
        const data: Preset[] = await response.json();
        setPresets(data);
      } catch (error) {
        console.error("Error fetching presets:", error);
      }
    };
    fetchPresets();
  }, []);
}
