import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to={"/"}
      className="flex items-center duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
      aria-label="logo Notebook, go to the Home page"
    >
      <img
        src="/NOTEBOOK.webp"
        alt="logo"
        className="border border-gray-600 rounded-full w-[32px] max-[720px]:w-[28px] h-[32px] max-[720px]:h-[28px]"
      />
      <span className="italic text-gray-300 text-2xl font-bold max-[720px]:text-[18px]">
        Notebook
      </span>
    </Link>
  );
};

export default Logo;
