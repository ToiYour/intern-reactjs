import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
const LayoutMain = () => {
  return (
    <div className="">
      <div className="max-w-[1120px] mx-auto">
        <Header />
        <main>{<Outlet />}</main>
        <Footer />
      </div>
    </div>
  );
};

export default LayoutMain;
