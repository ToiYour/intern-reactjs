import instance from "../config/instance";

export const login = (username: string) => {
  const uri = `/auth/login`;
  return instance.post(uri, { username });
};
export const logout = () => {
  const uri = `/auth/logout`;
  return instance.delete(uri);
};
export const refreshToken = (token: string) => {
  const uri = `/auth/refresh-token`;
  return instance.post(uri, {
    refreshToken: token,
  });
};
