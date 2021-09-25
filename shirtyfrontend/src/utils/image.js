import { apiUrl } from "../config.json";

export function getProductImageUrl(id) {
  return `${apiUrl}/products/${id}/image`;
}
