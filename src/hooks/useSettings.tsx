import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { Setting } from "../types";

export function useSettings(settings: Setting[], setSettings: any) {
  const [previousSettings, setPreviousSettings] = useState<Setting[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/api/settings/");
        setSettings(response.data);
        setPreviousSettings(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!previousSettings) return;

    settings.forEach(async (currentSetting: Setting) => {
      const previousSetting = previousSettings.find(s => s.key === currentSetting.key);

      if (previousSetting && previousSetting.value !== currentSetting.value) {
        await updateSetting(currentSetting.key, currentSetting.value);
      } else if (!previousSetting) {
        await saveSetting(currentSetting.key, currentSetting.value);
      }
    });

    previousSettings.forEach(async (previousSetting: Setting) => {
      if (!settings.some(s => s.key === previousSetting.key)) {
        await deleteSetting(previousSetting.key);
      }
    });

    setPreviousSettings(settings);
  }, [settings]);

  const saveSetting = async (key: string, value: string) => {
    try {
      await axiosInstance.post("/api/settings/", { key, value });
    } catch (error) {
      console.error(`Error saving setting ${key}:`, error);
    }
  };

  const updateSetting = async (key: string, value: string) => {
    try {
      await axiosInstance.put(`/api/settings/${key}`, { value });
    } catch (error) {
      console.error(`Error updating setting ${key}:`, error);
    }
  };

  const deleteSetting = async (key: string) => {
    try {
      await axiosInstance.delete(`/api/settings/${key}`);
    } catch (error) {
      console.error(`Error deleting setting ${key}:`, error);
    }
  };

  return { settings, setSettings };
}
