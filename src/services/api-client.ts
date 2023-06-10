import axios from "axios";

export default axios.create({
  params: {
    baseURL: "https://api.rawg.io/api",
    key: "be0c363e1eb0459283e84b06d92d19ff",
  },
});
