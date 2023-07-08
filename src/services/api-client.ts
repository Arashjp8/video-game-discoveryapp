import { API_KEY } from "./../../apiConfig";
import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: API_KEY,
    page_size: 10000,
  },
});
