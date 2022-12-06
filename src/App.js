import Board from './components/pages/Board';
import Workspaces from './components/pages/Workspaces';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Workspace from './components/pages/Workspace';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {StrictMode} from 'react';

function App() {
  
  return (
    

    <div className="app">
      <Router>
        
        <Routes>
          <Route path="/workspaces/:workspaceId/boards/:boardId" element={<Board />}/>
          <Route path="/workspaces/:id/boards" element={<Workspace />}/>
          <Route path="/workspaces" element={<Workspaces />}/>
          <Route path="/" element={<Workspaces />}/>
          <Route path="/signIn" element={<SignIn />}/>
          <Route path="/signUp" element={<SignUp />}/>
        </Routes>
      </Router>
    </div>
  );
}



export default App;
