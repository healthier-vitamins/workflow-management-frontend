import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import StockList from "./pages/StockList";
import { atom } from "jotai";
import "./App.css";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";

export const userAtom = atom({});

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/register-account" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="/profile-page" element={<Profile />} />
            <Route path="/stock-list" element={<StockList />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/createproject" element={<CreateProject />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
