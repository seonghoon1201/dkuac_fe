import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Activities from "./pages/Activities";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import People from "./pages/People";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import userInfoStore from "./stores/userInfoStore";
import "./App.css";

function App() {
  const { isLoggedIn } = userInfoStore();
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/people" element={<People />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
