import Board from './components/pages/Board';
import Workspaces from './components/pages/Workspaces';
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Workspace from './components/pages/Workspace';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import {getUser, getToken} from './utils/auth.js';
import {ProtectedRoute} from './components/ProtectedRoute.js';

function App() {
  
  const user = getUser();
  
  return (

    <div className="app">
      <BrowserRouter>        
        <Routes>
          
          <Route element={<ProtectedRoute isAllowed={!user} redirectTo={'workspaces'} />}>
            <Route index element={<SignIn />}/>
            <Route path="/signIn" element={<SignIn />}/>
            <Route path="/signUp" element={<SignUp />}/>
          </Route>

          <Route element={<ProtectedRoute isAllowed={!!user} redirectTo={'signIn'} />}>
            <Route path="/workspaces" element={<Workspaces />}/>
            <Route path="/workspaces/:workspaceId/boards/:boardId" element={<Board />}/>
            <Route path="/workspaces/:id/boards" element={<Workspace />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;
