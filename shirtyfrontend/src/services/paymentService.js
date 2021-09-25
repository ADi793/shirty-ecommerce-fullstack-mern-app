import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/payment";

export function getPaymentIntentSecret(order) {
  console.log(apiEndPoint);
  return http.post(apiEndPoint, order);
}
