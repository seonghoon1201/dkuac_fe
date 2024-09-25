import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import Equipment from "./pages/Equipment";
import People from "./pages/People";
import TotalDepartment from "./pages/Departments/Total";
import ClimbingDepartment from "./pages/Departments/Climbing";
import HikingDepartment from "./pages/Departments/Hiking";
import Contact from "./pages/Contact/index.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import userInfoStore from "./stores/userInfoStore";
import "./App.css";
import Schedules from "./pages/Schedules";
import logoutUtil from "./utils/logout-util.js";

function App() {
  const { isLoggedIn, expiredTime } = userInfoStore();

  useEffect(() => {
    const now = new Date();
    const expiredDate = new Date(expiredTime);

    const timeDiffBetweenNowAndExpiredTime = (expiredDate - now) / 1000;

    if (expiredTime !== "" && timeDiffBetweenNowAndExpiredTime < 0) {
      logoutUtil();
    }
    // if (expiredTime !== "" && timeDiffBetweenNowAndExpiredTime <= 30) {
    //   axios
    //     .get("https://dkuac.store/auth/token/access", {
    //       withCredentials: true,
    //     })
    //     .then((res) => {
    //       localStorage.setItem("accessToken", res.data.accessToken);
    //       userInfoStore.setState({ expiredTime: res.data.expiredTime });
    //     })
    //     .catch((error) => {
    //       localStorage.removeItem("accessToken");
    //       clearUserInfoStorage();
    //       basicAxios.post("/auth/logout");
    //       alert("다시 로그인해주세요.");
    //       window.location.href = "/login";
    //     });
    // }
  }, [expiredTime]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/people" element={<People />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />
          <Route path="/signup" element={isLoggedIn ? <Home /> : <SignUp />} />
          <Route path="/departments/total" element={<TotalDepartment />} />
          <Route
            path="/departments/climbing"
            element={<ClimbingDepartment />}
          />
          <Route path="/departments/hiking" element={<HikingDepartment />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
