import { IUserLogin, IUserSigup } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const signup = async (user: IUserSigup) => {
  let response;
  try {
    response = await api.post("/users", user);
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const login = async (user: IUserLogin) => {
  let response;
  try {
    response = await api.post("/login", user);
    localStorage.setItem("token", JSON.stringify(response.data.token));

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.data.token}`;
  } catch (error: any) {
    response = error.response;
  }
  return response;
};

const isAuthenticaded = (): boolean => {
  const token = localStorage.getItem("token");
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(
      token
    )}`;
  }
  return token ? true : false;
};

const logout = () => {
  localStorage.removeItem("token");
  api.defaults.headers.common["Authorization"] = "";
};

const AuthService = {
  signup,
  login,
  isAuthenticaded,
  logout,
};

export default AuthService;
