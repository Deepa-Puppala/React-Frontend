import React from "react";
import { validateToken } from "../Services/apiClient";
import { useLocalStorage } from "../Custom/UseLocalStorage";

interface IProtectedRouteProps {
  onInvalid: () => React.ReactNode;
}
const ProtectedRoute = ({
  onInvalid,
  children,
}: React.PropsWithChildren<IProtectedRouteProps>) => {
  const [token, setToken, clearToken] = useLocalStorage("token", "");
  const accessToken = window.localStorage.getItem("token");
  const invalid = onInvalid();

  if (!accessToken) {
    return <>{invalid || null}</>;
  }

  if (!validateToken(accessToken)) {
    clearToken();
    return <>{invalid || null}</>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
