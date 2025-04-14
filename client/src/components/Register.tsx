import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/authSlice";
import { AppDispatch, RootState } from "../store";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) return;
    try {
      await dispatch(register({ username, email, password }));
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h2 className="font-serif font-bold text-2xl py-8">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded-2xl p-2 outline-amber-100 w-[300px]"
      />
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
        onClick={handleRegister}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-800 w-[300px] cursor-pointer"
      >
        Register
      </button>
      <p>
        Already have an account please{" "}
        <Link
          to="/login"
          className="underline text-blue-600 hover:text-blue-800"
        >
          Login
        </Link>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
