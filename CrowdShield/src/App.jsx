import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./components/MainPage";
import AboutPage from "./components/AboutPage";
import WorkPage from "./components/WorkPage";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

      </Routes>
    </Router>
  );
}
export default App;
