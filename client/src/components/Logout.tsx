import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { AppDispatch } from "../store";

const Logout = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      alert("Logout successful!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-800 w-[300px] cursor-pointer"
    >
      Logout
    </button>
  );
};

export default Logout;
