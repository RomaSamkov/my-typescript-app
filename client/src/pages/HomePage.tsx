import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store"; // Adjust the path to your store file
import { useEffect } from "react";
import { authCheck, logout } from "../slices/authSlice";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      alert("Logout successful!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <p>
      <div>
        {user ? <p>Welcome, {user.username}!</p> : <p>Please log in.</p>}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </p>
  );
  // const { user } = useSelector((state: RootState) => state.auth);
  // return (
  //   <div className="flex justify-center gap-12">
  //     {!user ? "No user" : `Hello ${user?.username}`}
  //   </div>
  // );
};

export default HomePage;
