import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={'/'} className="flex items-end gap-2">
      <span className="size-5 bg-[#9C69E2] rounded-[20px]"></span>
      <span className="w-5 h-9 bg-[#F063B8] rounded-[20px]"></span>
    </Link>
  );
};

export default Logo;
