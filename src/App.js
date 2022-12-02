import Board from './components/pages/Board';
import Workspaces from './components/pages/Workspaces';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    

    <div className="app">
      <Router>
        
        <Routes>
          <Route path="/" element={<Board />}/>
          <Route path="/workspaces" element={<Workspaces />}/>
        </Routes>
      </Router>
    </div>
  );
}



export default App;
