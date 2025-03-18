import { Link } from "react-router-dom";
import Logo from "./Logo";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex justify-between px-8 py-4 gap-36">
      <Logo />
      <nav className="flex justify-between gap-24">
        <Link
          to={"/todo"}
          className="text-2xl font-bold text-gray-400 hover:text-gray-300 duration-300 hover:drop-shadow-[0_0_1em_#646cffaa] hover:underline"
        >
          Todo
        </Link>
        <Link
          to={"/notes"}
          className="text-2xl font-bold text-gray-400 hover:text-gray-300 duration-300 hover:drop-shadow-[0_0_1em_#646cffaa] hover:underline"
        >
          Notes
        </Link>
      </nav>
      <div className="text-2xl font-bold text-gray-500">User😀</div>
    </div>
  );
};

export default Header;
