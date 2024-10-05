import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./app.css";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  const [user, setUser] = useState<boolean | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/auth/login/success",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const resObj = await response.json();
        setUser(resObj.user);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);
  
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
