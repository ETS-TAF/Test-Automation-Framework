import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import Selection from "./Selection";
import Waiting from "./Waiting";
import Result from "./Results";
import TestCase from "./TestCase";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/results" element={<Result />} />
        <Route path="/test-case" element={<TestCase />} />
      </Routes>
    </Router>

  );
}


export default App;
