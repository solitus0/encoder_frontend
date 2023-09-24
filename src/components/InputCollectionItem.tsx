import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { Setting } from "../types";
import axiosInstance from "../axiosInstance";
import { useSettings } from "../hooks/useSettings";
import AppContext from "../AppContext";

interface InputCollectionItemProps {
  value: string;
  settingKey: string;
  setting: Setting;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputCollectionItem({
  value,
  settingKey,
  setting,
  onChange,
}: InputCollectionItemProps) {
  const { refreshSettings, setRefreshSettings } = React.useContext(AppContext);

  const handleIconClick = () => {
    if (value === "") return;

    const payload = {
      key: settingKey,
      value,
    };

    if (setting.id != null) {
      const url = `api/settings/${setting.id}`;

      axiosInstance
        .put(url, payload)
        .then((response) => {
          console.log("Setting updated successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error updating the setting:", error);
        });

      setRefreshSettings(!refreshSettings);
    } else {
      const url = "api/settings";

      axiosInstance
        .post(url, payload)
        .then((response) => {
          console.log("Setting created successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error creating the setting:", error);
        });
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 1300,
        height: 60,
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          "&.Mui-error": {
            color: "red",
            borderColor: "red",
          },
        }}
        placeholder="Directory"
        inputProps={{ "aria-label": "Directory" }}
        fullWidth
        value={value}
        onChange={onChange}
        className={setting.valid === false ? "Mui-error" : ""}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        onClick={handleIconClick}
        color="primary"
        aria-label="create new folder"
      >
        <CreateNewFolderIcon />
      </IconButton>
    </Paper>
  );
}
