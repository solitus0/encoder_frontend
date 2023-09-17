import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import { Typography, Grid } from "@material-ui/core";
import { CheckCircle, Error } from "@material-ui/icons";

interface ServiceStatus {
  name: string;
  url: string;
  status: boolean | null;
}

const checkService = async (url: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.get(url);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

const HealthCheck: React.FC = () => {
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: "API", url: "/healthcheck/api", status: null },
    { name: "RabbitMQ", url: "/healthcheck/rabbitmq", status: null },
  ]);

  useEffect(() => {
    services.forEach(async (service, index) => {
      const status = await checkService(service.url);
      setServices((prevServices) => {
        const updatedServices = [...prevServices];
        updatedServices[index].status = status;
        return updatedServices;
      });
    });
  }, []);

  return (
    <Grid container>
      {services.map((service) => (
        <Grid
          container
          key={service.name}
          alignItems="center"
          justifyContent="center"
          spacing={1}
          item
          xs={6}
        >
          <Grid>
            <Typography variant="body1">{service.name}:</Typography>
          </Grid>
          <Grid item>
            {service.status ? (
              <CheckCircle color="primary" />
            ) : (
              <Error color="error" />
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default HealthCheck;
