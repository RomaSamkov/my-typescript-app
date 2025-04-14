import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { AppDispatch, RootState } from "../store";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!email || !password) return;
    try {
      await dispatch(login({ email, password }));
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h2 className="font-serif font-bold text-2xl py-8">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded-2xl p-2 outline-amber-100 w-[300px]"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded-2xl p-2 outline-amber-100 w-[300px]"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-800 w-[300px] cursor-pointer"
      >
        Login
      </button>
      <p>
        If you haven't an account please{" "}
        <Link
          to="/register"
          className="underline text-blue-600 hover:text-blue-800"
        >
          Register
        </Link>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
