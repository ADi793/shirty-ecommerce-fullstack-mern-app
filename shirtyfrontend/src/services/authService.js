import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = apiUrl + "/auth";

export async function setJwt() {
  http.setJwt(getJwt());
}

http.setJwt(getJwt());

export async function signIn(user) {
  const { data: token } = await http.post(apiEndPoint, user);
  localStorage.setItem("token", token);
}

export async function signout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem("token");
}

export default {
  signIn,
  signout,
  setJwt,
  getCurrentUser,
};
