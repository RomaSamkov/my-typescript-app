import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../slices/authSlice";
import { AppDispatch, RootState } from "../store";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleRegister = async () => {
    if (!username || !email || !password) return;
    try {
      await dispatch(register({ username, email, password }));
      alert("Registration successful!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border"
      />
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
      <button onClick={handleRegister} disabled={loading} className="border">
        Register
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
