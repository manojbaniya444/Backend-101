import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
