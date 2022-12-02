import Board from './components/pages/Board';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    

    <div className="app">
      <Router>
        <Board />
        <Routes>
          <Route path="/" element={<div></div>}/>
          <Route path="/workspaces" element={<div></div>}/>
        </Routes>
      </Router>
    </div>
  );
}



export default App;
