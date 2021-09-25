import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/users";

export function signUp(user) {
  return http.post(apiEndPoint, user);
}
