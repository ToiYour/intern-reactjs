import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider"
import { ReactNode } from "react";

const PrivateRouter = ({children}:{children:ReactNode}) => {
    const {isLogin} = useAuth();
    if (!isLogin) {
        
        alert('Bạn chưa login')
        return <Navigate to={'/login'}/> ;
        
    }
  return (
    <div>{children}</div>
  )
}

export default PrivateRouter