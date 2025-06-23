import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from "./components/MainPage";
import AboutPage from "./components/AboutPage";
import WorkPage from "./components/WorkPage";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}
export default App;
