import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { Route, Switch, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
