import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Activities from "./pages/Activities";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import People from "./pages/People";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import userInfoStore from "./stores/userInfoStore";
import { authAxios, basicAxios } from "./api/axios";
import "./App.css";

function App() {
  const { isLoggedIn, expiredTime } = userInfoStore();
  const clearUserInfoStorage = userInfoStore.persist.clearStorage;
  useEffect(() => {
    let now = new Date().toUTCString();
    if (expiredTime && expiredTime < now) {
      basicAxios
        .get("/auth/token/access")
        .then((res) => {
          localStorage.setItem("accessToken", res.data.accessToken);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            localStorage.removeItem("accessToken");
            clearUserInfoStorage();
          }
          console.error(error);
          alert("다시 로그인해주세요.");
          window.location.href = "/login";
        });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/people" element={<People />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Home /> : <SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
