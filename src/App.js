import Board from './components/pages/Board';
import Workspaces from './components/pages/Workspaces';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Workspace from './components/pages/Workspace';

function App() {
  
  return (
    

    <div className="app">
      <Router>
        
        <Routes>
          <Route path="/workspaces/:workspaceId/boards/:boardId" element={<Board />}/>
          <Route path="/workspaces/:id/boards" element={<Workspace />}/>
          <Route path="/workspaces" element={<Workspaces />}/>
        </Routes>
      </Router>
    </div>
  );
}



export default App;
