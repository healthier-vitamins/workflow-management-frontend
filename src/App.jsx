import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import StockList from "../pages/StockList";
import "./App.css";

function App() {

  return (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<HomePage/>}/>
          <Route path="/register-account" element={<SignUp/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="/profile-page" element={<Profile/>}/>
          <Route path="/stock-list" element={<StockList/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </div>);
}

export default App;
