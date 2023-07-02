import Game from "./Game";

export default interface FetchGamesResponse {
  count: number;
  results: Game[];
}
