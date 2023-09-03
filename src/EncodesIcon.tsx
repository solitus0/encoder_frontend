import { useState } from "react";
import {
  IconButton,
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import { Encode } from "./types";

function EncodesIcon() {
  const [open, setOpen] = useState<boolean>(false);
  const [encodes, setEncodes] = useState<Encode[]>([]);

  const handleOpen = async () => {
    setOpen(true);

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(
        apiUrl + "/api/encodes?media_uuid=3a56a55b-25fa-4090-9ea2-ddb9f0ede5a9"
      );
      const data: Encode[] = await response.json();
      setEncodes(data);
    } catch (error) {
      console.error("Error fetching encodes:", error);
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Encodes">
        <IconButton color="primary" onClick={handleOpen}>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="encode-modal-title"
      >
        <Box
          sx={{
            width: "80%",
            maxWidth: 600,
            padding: 3,
            bgcolor: "background.paper",
            margin: "auto",
            marginTop: "5%",
            outline: "none",
            overflowY: "auto",
          }}
        >
          <Typography id="encode-modal-title" variant="h6" component="div">
            Encodes
          </Typography>
          <List>
            {encodes.map((encode, index) => (
              <Box key={index}>
                <ListItem>
                  <Box sx={{ width: "100%" }}>
                    <Typography>Status: {encode.status}</Typography>
                    <Typography>Media UUID: {encode.media_uuid}</Typography>
                    <Typography>Source Path: {encode.source_path}</Typography>
                    <Typography>
                      Source Size: {encode.source_size} GB
                    </Typography>
                    <Typography>Created At: {encode.created_at}</Typography>
                    <Typography>
                      Output Size: {encode.output_size} GB
                    </Typography>
                    <Typography>Command: {encode.command}</Typography>
                    <Typography>Output Path: {encode.output_path}</Typography>
                    <Typography>
                      Duration: {encode.duration_in_seconds} seconds
                    </Typography>
                  </Box>
                </ListItem>
                {index !== encodes.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Box>
      </Modal>
    </>
  );
}

export default EncodesIcon;
