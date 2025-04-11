import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type AuthState = {
  user: { username: string; email: string } | null;
  loading: boolean;
  error: string | null;
};

const savedUser = localStorage.getItem("user");

const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  loading: false,
  error: null,
};

// Register
export const register = createAsyncThunk(
  "auth/register",
  async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch(
      "http://localhost:3000/api/notebook/auth/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );
    if (!response.ok) {
      throw new Error("Registration failed");
    }
    return await response.json();
  }
);

// Login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(
      "http://localhost:3000/api/notebook/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Для передачі кукі
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error("Login failed");
    }
    return data;
  }
);

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await fetch(
    "http://localhost:3000/api/notebook/auth/logout",
    {
      method: "POST",
      credentials: "include", // Для передачі кукі
    }
  );
  if (!response.ok) {
    throw new Error("Logout failed");
  }
  return await response.json();
});

export const authCheck = createAsyncThunk("auth/authCheck", async () => {
  const response = await fetch(
    "http://localhost:3000/api/notebook/auth/auth-check",
    {
      method: "GET",
      credentials: "include", // Для передачі кукі
    }
  );
  if (!response.ok) {
    throw new Error("Auth check failed");
  }
  return await response.json();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authCheck.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.user; // Зберігаємо користувача, отриманого з сервера
      })
      .addCase(authCheck.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authCheck.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Auth check failed";
        state.user = null; // Якщо перевірка не пройшла, очищаємо користувача
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        // Зберігаємо користувача в localStorage
        // localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        // Видаляємо користувача з localStorage
        // localStorage.removeItem("user");
      });
  },
});

export default authSlice.reducer;
