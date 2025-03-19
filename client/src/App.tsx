import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Todo from "./components/Todo";
import Notes from "./components/Notes";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/todos" element={<Todo />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </>
  );
}

export default App;
