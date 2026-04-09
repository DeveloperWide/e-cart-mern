import React, { useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import { API } from "./services/api";

const App = () => {
  useEffect(() => {
    API.get("/").then((res) => {
      console.log(res.data);
    });
  });

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
