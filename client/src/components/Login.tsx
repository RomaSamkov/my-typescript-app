import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { AppDispatch, RootState } from "../store";
import { useNavigate } from "react-router-dom";

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
      navigate("/todos");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border"
      />
      <button
        onClick={handleLogin}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
      >
        Login
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
