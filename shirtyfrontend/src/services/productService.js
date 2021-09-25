import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/products";

export function saveProduct(product) {
  const id = product.get("_id");
  if (id) {
    product.delete("_id");
    return http.put(apiEndPoint + "/" + id, product);
  }

  return http.post(apiEndPoint, product);
}

export function getProducts() {
  return http.get(apiEndPoint);
}

export function getProduct(id) {
  return http.get(apiEndPoint + "/" + id);
}

export function deleteProduct(id) {
  return http.delete(apiEndPoint + "/" + id);
}
