import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/ss" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
