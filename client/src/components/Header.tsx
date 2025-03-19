import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

type Props = {};

const Header = (props: Props) => {
  const location = useLocation();

  return (
    <div className="flex justify-between px-8 py-4 gap-36">
      <Logo />
      <nav className="flex justify-between gap-24">
        <Link
          to={"/todos"}
          className={`text-2xl font-bold font-serif duration-300 hover:drop-shadow-[0_0_1em_#646cffaa]
            ${
              location.pathname === "/todos"
                ? "text-gray-300 drop-shadow-[0_0_0_#074da8aa] after:scale-x-100"
                : "text-gray-400 hover:text-gray-300 hover:after:scale-x-100"
            }
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gray-300 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}
        >
          Todo
        </Link>
        <Link
          to={"/notes"}
          className={`text-2xl font-bold font-serif duration-300 hover:drop-shadow-[0_0_1em_#646cffaa]
          ${
            location.pathname === "/notes"
              ? "text-gray-300 drop-shadow-[0_0_0_#074da8aa] after:scale-x-100"
              : "text-gray-400 hover:text-gray-300 hover:after:scale-x-100"
          }
          after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gray-300 after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100`}
        >
          Notes
        </Link>
      </nav>
      <div className="text-2xl font-bold text-gray-500">User😀</div>
    </div>
  );
};

export default Header;
