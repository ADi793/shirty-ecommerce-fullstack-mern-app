import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/orders";

export function createOrder(order) {
  return http.post(apiEndPoint, order);
}

export function getOrders() {
  return http.get(apiEndPoint);
}

export function getUserOrders() {
  return http.get(apiEndPoint + "/user");
}

export function getUserOrder(id) {
  return http.get(apiEndPoint + "/" + id);
}

export function updateOrderStatus(id, status) {
  return http.put(apiEndPoint + "/" + id + "/status", status);
}
