import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const apiInstance = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "be0c363e1eb0459283e84b06d92d19ff",
    page_size: 10000,
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getALL = async (config: AxiosRequestConfig) => {
    return await apiInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);
  };
}

export default APIClient;
