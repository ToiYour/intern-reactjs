import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { useHandleLogout } from "../../common/hook";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LayoutProfile = () => {
  const navigate = useNavigate();
  const { handleLogout } = useHandleLogout();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex items-start h-screen bg-gray-100">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-20 md:hidden bg-purple-600 text-white p-2 rounded-full"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out w-64 bg-[#D9D9D9] shadow-md h-full z-10`}
      >
        <div className="p-4">
          <div className="flex items-center justify-center mb-8">
            <Logo />
          </div>
          <nav>
            <Link
              to="/profile"
              className="block py-2 text-black hover:text-gray-800"
              onClick={() => setIsOpen(false)}
            >
              Posts
            </Link>
            <div
              onClick={() => {
                handleLogout();
                navigate("/");
              }}
              className="block py-2 text-black hover:text-gray-800 cursor-pointer"
            >
              Logout
            </div>
          </nav>
        </div>
      </div>

      <div className="w-full p-4 md:p-10 max-w-full max-h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutProfile;