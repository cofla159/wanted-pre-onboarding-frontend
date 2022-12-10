import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Todo from "./pages/Todo";
import Join from "./pages/Join";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div id="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/join" element={<Join />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
