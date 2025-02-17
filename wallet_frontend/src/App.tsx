import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./App.css";

import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import Wallet from "./components/Wallet";
import WalletTransaction from "./components/WalletTransaction";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/dashboard/:id" Component={Home} />
        <Route path="/register" Component={Register} />
        <Route path="/wallet/:id" Component={Wallet} />
        <Route path="/transactions/:id" Component={WalletTransaction} />
      </Routes>
    </>
  );
}

export default App;
