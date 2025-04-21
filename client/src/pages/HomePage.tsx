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
      <div className="flex gap-8 w-full max-w-4xl">
        <Link
          to={"/todos"}
          className="flex-1 bg-gray-300 shadow-lg p-4 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-blue-400"
        >
          <img
            src="/Screenshot Todo.png"
            alt="screenTodo"
            className="w-full h-auto rounded-lg"
          />
          <p className="text-center mt-4 text-lg font-semibold">Todos</p>
        </Link>
        <Link
          to={"/notes"}
          className="flex-1 bg-gray-300 shadow-lg p-4 rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-green-400"
        >
          <img
            src="/Screenshot Notes.png"
            alt="screenNotes"
            className="w-full h-auto rounded-lg"
          />
          <p className="text-center mt-4 text-lg font-semibold">Notes</p>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
