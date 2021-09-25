import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndPoint = apiUrl + "/categories";

export function getCategories() {
  return http.get(apiEndPoint);
}

export function getCategory(id) {
  return http.get(apiEndPoint + "/" + id);
}

export function saveCategory(category) {
  if (category._id) {
    const body = { ...category };
    delete body._id;

    return http.put(apiEndPoint + "/" + category._id, body);
  }

  return http.post(apiEndPoint, category);
}

export function deleteCategory(id) {
  return http.delete(apiEndPoint + "/" + id);
}
