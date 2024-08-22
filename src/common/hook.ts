/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { logout } from "../services/auth";

export const useHandleLogout = () => {
  const { setIsLogin } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      setIsLogin(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data);
      }
    }
  };

  return { handleLogout };
};
export function useDebounceCallback<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return function debouncedCallback(...args: Parameters<T>) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
