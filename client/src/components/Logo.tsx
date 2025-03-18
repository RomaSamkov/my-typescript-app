import { Link } from "react-router-dom";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link
      to={"/"}
      className="flex items-center duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
      aria-label="logo Notebook, go to the Home page"
    >
      <img
        src="/NOTEBOOK.webp"
        alt="logo"
        width={32}
        height={32}
        className="border border-gray-600 rounded-full"
      />
      <span className="italic text-gray-500 text-2xl font-bold">Notebook</span>
    </Link>
  );
};

export default Logo;
