import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from "react";

interface IAuthContext {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogin, setIsLogin] = useState(Boolean(localStorage.getItem('accessToken') && localStorage.getItem('accessToken')));
  const value = { isLogin, setIsLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthProvider chưa được sử dụng");
  }
  return context;
};

export { AuthProvider, useAuth };

