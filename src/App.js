import './App.css';

import Navbar from './components/Navbar';
import Dashboard from './components/dashboard/Dashboard.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




function App() {

  
  return (
    <div className="app">
      <Router>
        <Dashboard />
        <Routes>
          <Route path="/" element={<div></div>}/>
          <Route path="/workspaces" element={<div></div>}/>
        </Routes>
      </Router>
    </div>

  );
}



export default App;
