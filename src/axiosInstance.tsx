import axios, { AxiosInstance } from "axios";

class AxiosService {
  private static instance: AxiosService;
  public axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 10000,
    });
  }

  public static getInstance(): AxiosService {
    if (!AxiosService.instance) {
      AxiosService.instance = new AxiosService();
    }

    return AxiosService.instance;
  }
}

export default AxiosService.getInstance().axiosInstance;
