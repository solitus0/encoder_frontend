import * as React from "react";
import { useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InputCollectionItem from "./InputCollectionItem";
import axiosInstance from "../axiosInstance";
import { Setting } from "../types";

import AppContext from "../AppContext";

interface DirComponentProps {
  title: string;
  settingKey: string;
  maxInputs: number;
}

export const DirComponent: React.FC<DirComponentProps> = ({
  title,
  settingKey,
  maxInputs,
}) => {
  const { settings, setSettings } = useContext(AppContext);
  const inputs = settings.filter(
    (setting: Setting) => setting.key === settingKey
  );

  useEffect(() => {
    const inputs = settings.filter(
      (setting: Setting) => setting.key === settingKey
    );

    if (!inputs.length) {
      setSettings([...settings, { key: settingKey, value: "" }]);
    }
  }, [settings]);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedSettings = settings.map((setting) =>
      setting.key === settingKey &&
      (setting.id ? setting.id === inputs[index].id : setting === inputs[index])
        ? { ...setting, value: event.target.value }
        : setting
    );
    setSettings(updatedSettings);
  };

  const handleAddInput = () => {
    if (inputs.length < maxInputs) {
      setSettings([...settings, { key: settingKey, value: "" }]);
    } else {
      console.warn("Maximum number of inputs reached.");
    }
  };

  const handleRemoveInput = (index: number) => {
    const setting = inputs[index];

    if (setting.id != null) {
      axiosInstance
        .delete(`/api/settings/${setting.id}`)
        .then(() => {
          const updatedSettings = settings.filter(
            (s) => s.id !== setting.id || s.key !== settingKey
          );
          setSettings(
            updatedSettings.length
              ? updatedSettings
              : [{ key: settingKey, value: "" }]
          );
        })
        .catch((error) => console.error("Error deleting the setting:", error));
    } else {
      const updatedSettings = settings.filter(
        (s, i) => s.key !== settingKey || i !== index
      );
      setSettings(
        updatedSettings.length
          ? updatedSettings
          : [{ key: settingKey, value: "" }]
      );
    }
  };

  return (
    <Box>
      <Box marginBottom={3}>
        <h2>{title}</h2>
      </Box>
      {inputs.map((setting, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom={3}>
          <InputCollectionItem
            value={setting.value}
            settingKey={settingKey}
            setting={setting}
            onChange={(e) => handleInputChange(index, e)}
          ></InputCollectionItem>
          <Box marginLeft={3} display="flex" alignItems="center">
            {inputs.length < maxInputs && (
              <IconButton onClick={handleAddInput} color="primary">
                <AddCircleOutlineIcon />
              </IconButton>
            )}
            {
              <IconButton
                onClick={() => handleRemoveInput(index)}
                color="secondary"
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
            }
          </Box>
        </Box>
      ))}
    </Box>
  );
};
