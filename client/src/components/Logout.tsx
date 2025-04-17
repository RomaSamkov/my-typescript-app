import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import { AppDispatch } from "../store";
import { LogOut } from "lucide-react";

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
    <LogOut
      size={18}
      onClick={handleLogout}
      className="cursor-pointer hover:text-red-500"
    />
  );
};

export default Logout;
