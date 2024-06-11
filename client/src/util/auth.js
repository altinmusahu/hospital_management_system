import axios from "axios";
import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  return expirationDate.getTime() - now.getTime();
}
export function getAuthToken() {
  let token = localStorage.getItem("token");
  const tokenDuration = getTokenDuration();
  const refreshToken = localStorage.getItem("refreshToken");
  // if (!refreshToken) {
  //   return "EXPIRED";
  // }
  if (tokenDuration <= 0) {
    axios
      .patch("http://localhost:3000/auth/refresh", refreshToken)
      .then((response) => {
        if (response.status === 200) {
          token = response.data.token;
          localStorage.removeItem("token");
          localStorage.setItem("token", token);
          const expiration = new Date();
          expiration.setHours(expiration.getHours() + 1);
          localStorage.removeItem("expiration");
          localStorage.setItem("expiration", expiration.toISOString());
        } else {
          return null;
        }
      });
  }
  if (!token) {
    return null;
  }
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }
  return null;
}

export function isAdminLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }
  const role = localStorage.getItem("role");
  return role == 4 ? null : redirect("/not-authorized");
}
export function isDoctorLoader() {
  const token = getAuthToken();
  if (!token) {
    return redirect("/login");
  }
  const role = localStorage.getItem("role");
  return role == 3 ? null : redirect("/not-authorized");
}
