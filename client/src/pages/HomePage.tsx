import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store"; // Adjust the path to your store file
import { useEffect } from "react";
import { authCheck } from "../slices/authSlice";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(authCheck());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div>
        {user ? (
          <p>Welcome, {user.username}!</p>
        ) : (
          <p className="text-2xl ">
            Please{" "}
            <Link
              to={"/login"}
              className="underline text-blue-600 hover:text-blue-800"
            >
              Log in
            </Link>
            , because saving do not work for unauthorized users.
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <div>Todo</div>
        <div>Notes</div>
      </div>
    </div>
  );
};

export default HomePage;
