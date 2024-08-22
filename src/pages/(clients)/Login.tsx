import { AxiosError } from "axios";
import Logo from "../../components/Logo";
import { login } from "../../services/auth";
import { FormEvent } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {setIsLogin} = useAuth();
  const navigate = useNavigate();
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(">>>>submit");
      
      const formData = new FormData(e.target as HTMLFormElement);
      const username = formData.get("username");
      const { data } = await login(username as string);
      localStorage.setItem('accessToken',JSON.stringify(data.accessToken));
      localStorage.setItem('refreshToken',JSON.stringify(data.refreshToken));
      setIsLogin(true);
      navigate('/')
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
      }
    }
  };
  return (
    <div className="h-screen max-w-[1120px] mx-auto">
      <div className="p-4">
        <Logo />
      </div>
      <div className="max-md:px-3 flex-grow flex pt-20 justify-center my-auto h-full">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-8">Sign In</h2>
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
