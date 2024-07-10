import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Activities from "./components/Activities";
import Login from "./components/Login";
import Signup from "./components/Signup";
import People from "./components/People";
import Contact from "./components/Contact";
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
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
