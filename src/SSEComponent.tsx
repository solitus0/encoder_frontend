import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { formatReadableDate } from "./timeUtil";
import AppContext from "./AppContext";

interface SSEMessage {
  media_uuid: string;
  progress: number;
  created_at: string;
  source_path: string;
}

const SSEComponent: React.FC = () => {
  const [message, setMessage] = useState<SSEMessage | null>(null);
  const { setCurrentlyEncoding, permissions } = React.useContext(AppContext);

  useEffect(() => {
    if (!permissions.rabbitmq) {
      return;
    }

    const apiUrl = process.env.REACT_APP_API_URL;
    const eventSource = new EventSource(apiUrl + "/sse");

    eventSource.addEventListener(
      "progress",
      function (e) {
        const data: SSEMessage = JSON.parse(e.data);
        setCurrentlyEncoding(data.media_uuid);
        setMessage(data);
      },
      false
    );

    eventSource.addEventListener(
      "message_received",
      function (e) {
        setMessage(null);
      },
      false
    );

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [permissions]);

  return (
    <div>
      {message && (
        <Alert severity="info">
          <strong>File name:</strong> {message.source_path} <br />
          <strong>Started At:</strong> {formatReadableDate(message.created_at)}{" "}
          <br />
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="100%"
          >
            <Box width="100%" mr={1}>
              <LinearProgress variant="determinate" value={message.progress} />
            </Box>
            <Box>
              <Typography
                variant="body2"
                color="textSecondary"
              >{`${message.progress}%`}</Typography>
            </Box>
          </Box>
        </Alert>
      )}
    </div>
  );
};

export default SSEComponent;
