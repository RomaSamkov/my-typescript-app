type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="flex justify-center">
      <div className="flex gap-1 text-2xl font-bold text-gray-500 max-[720px]:hidden">
        <div className="font-serif duration-300 hover:drop-shadow-[0_0_1em_#646cffaa] bg-gray-600 border rounded-2xl px-2 text-gray-400 hover:text-gray-300 hover:after:scale-x-100 cursor-pointer">
          Login
        </div>

        <div className="font-serif duration-300 hover:drop-shadow-[0_0_1em_#646cffaa] bg-gray-600 border rounded-2xl px-2 text-gray-400 hover:text-gray-300 hover:after:scale-x-100 cursor-pointer">
          Register
        </div>
      </div>
    </div>
  );
};

export default HomePage;
