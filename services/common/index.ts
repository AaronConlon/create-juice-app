import { API } from "~/componsables/request";
import { TDemoResponse } from "./types";
import { URL_GET_DEMO_DATA } from "../url.list";

export const commonApi = {
  getDemoData: () => API.get<TDemoResponse>(URL_GET_DEMO_DATA),
};
