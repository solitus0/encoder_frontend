import React, { useState, useEffect } from "react";
import AppContext from "../../AppContext";

import {
  Button,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Typography,
  Box,
} from "@mui/material";
import { Preset } from "../../types";

import HdIcon from "@mui/icons-material/Hd";

function PresetInfo({ preset }: { preset: Preset | null }) {
  if (!preset) return null;

  return (
    <Typography component="div">
      <pre>
        {`
Audio Bitrate: ${preset.AudioBitrate}
Audio Encoder: ${preset.AudioEncoder}
Audio Mixdown: ${preset.AudioMixdown}
Audio Samplerate: ${preset.AudioSamplerate}
File Format: ${preset.FileFormat}
Picture Width: ${preset.PictureWidth}
Picture Height: ${preset.PictureHeight}
Video Encoder: ${preset.VideoEncoder}
Video Preset: ${preset.VideoPreset}
Video Quality: ${preset.VideoQualitySlider}
      `}
      </pre>
    </Typography>
  );
}

function EncodeButton() {
  const [open, setOpen] = useState(false);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const { rowSelection } = React.useContext(AppContext);

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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEncode = async () => {
    if (!selectedPreset || !rowSelection) return;

    const presetName = selectedPreset.PresetName;

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(apiUrl + "/api/encodes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          preset: presetName,
          media_ids: rowSelection,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error("Error encoding:", responseData);
      }
    } catch (error) {
      console.error("Network or other error:", error);
    }

    handleClose();
  };
  const handlePresetChange = (event: SelectChangeEvent<string>) => {
    const selected = presets.find((p) => p.PresetName === event.target.value);
    if (selected) {
      setSelectedPreset(selected);
    }
  };

  return (
    <>
      <Button
        color="primary"
        onClick={handleOpen}
        startIcon={<HdIcon />}
        variant="contained"
        size="large"
        disabled={!rowSelection?.length}
        fullWidth
      >
        Encode
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="encode-modal-title"
      >
        <Box
          sx={{
            width: 400,
            padding: 3,
            bgcolor: "background.paper",
            margin: "auto",
            marginTop: "10%",
            outline: "none",
          }}
        >
          <Typography id="encode-modal-title" variant="h6" component="div">
            Choose a Preset
          </Typography>
          <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
            <InputLabel htmlFor="preset-select">Preset</InputLabel>
            <Select
              labelId="preset-select-label"
              value={(selectedPreset?.PresetName as string) || ""}
              onChange={handlePresetChange}
              label="Preset"
            >
              {presets.map((preset) => (
                <MenuItem key={preset.PresetName} value={preset.PresetName}>
                  {preset.PresetName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <PresetInfo preset={selectedPreset} />
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ mr: 2 }}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleEncode}
              disabled={!selectedPreset}
            >
              Encode
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default EncodeButton;
