// import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/firstLogin/Welcome";
import Dashboard from "./components/mainStructure/Dashboard";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
