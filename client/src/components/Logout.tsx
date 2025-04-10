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

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
