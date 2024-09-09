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
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import userInfoStore from "./stores/userInfoStore";
import { authAxios, basicAxios } from "./api/axios";
import "./App.css";
import Schedules from "./pages/Schedules";
import axios from "axios";

function App() {
  const { isLoggedIn, expiredTime, isStaff } = userInfoStore();
  const clearUserInfoStorage = userInfoStore.persist.clearStorage;

  useEffect(() => {
    const now = new Date();
    const expiredDate = new Date(expiredTime);

    console.log("expiredTime: ", expiredDate);
    console.log("now: ", now);
    console.log("expiredTime이 현재 시간보다 과거인가? ", expiredDate <= now);
    console.log(expiredDate - now);
    const timeDiffBetweenNowAndExpiredTime = (expiredDate - now) / 1000;
    console.log("만료 시간까지 남은 시간: ", timeDiffBetweenNowAndExpiredTime);

    if (expiredTime !== "" && timeDiffBetweenNowAndExpiredTime <= 30) {
      console.log(
        "expiredTime이 현재 시간보다 30초 이내로 남았습니다. accessToken 갱신 시도 중..."
      );
      axios
        .get("https://dkuac.store/auth/token/access", {
          withCredentials: true,
        })
        .then((res) => {
          console.log("새로운 accessToken을 성공적으로 받았습니다!");
          console.log(res);
          localStorage.setItem("accessToken", res.data.accessToken);
          userInfoStore.setState({ expiredTime: res.data.expiredTime });
        })
        .catch((error) => {
          console.error("accessToken 갱신 실패: ", error);
          localStorage.removeItem("accessToken");
          clearUserInfoStorage();
          basicAxios.post("/auth/logout");
          window.location.href = "/login";
        });
      console.log(
        "accessToken이 유효하지 않습니다. 로그인 페이지로 이동합니다."
      );
    } else {
      console.log("accessToken이 유효합니다.");
    }
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
