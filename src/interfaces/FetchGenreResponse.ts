import Genre from "./Genre";

export default interface FetchGenreResponse {
  count: number;
  results: Genre[];
}
