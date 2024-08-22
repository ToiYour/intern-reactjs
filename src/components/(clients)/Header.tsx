import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useHandleLogout } from "../../common/hook";
import { useAuth } from "../../contexts/AuthProvider";
import Logo from "../Logo";
const Header = () => {
  const { isLogin } = useAuth();
  const { handleLogout } = useHandleLogout();

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "linear" }}
    >
      <nav className="bg-white p-4 flex justify-between items-center">
        <Logo />
        {isLogin ? (
          <div className="flex items-center gap-7">
            <Link
              to={"/profile"}
              className="bg-purple-600 capitalize text-white px-7 py-2 rounded-[50px]"
            >
              Profile
            </Link>
            <div
              onClick={handleLogout}
              className="cursor-pointer bg-purple-600 capitalize text-white px-7 py-2 rounded-[50px]"
            >
              Logout
            </div>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="bg-purple-600 capitalize text-white px-7 py-2 rounded-[50px]"
          >
            Sign in
          </Link>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
