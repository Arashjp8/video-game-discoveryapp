// import { API_KEY } from "./../../apiConfig";

import axios from "axios";

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "be0c363e1eb0459283e84b06d92d19ff",
    page_size: 10000,
  },
});
