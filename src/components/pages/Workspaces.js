import Base from '../Base';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import WorkspaceCard from '../WorkspaceOrBoardCard';
import WorkspaceService from '../../services/workspace.service.js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import AddWorkspaceOrBoard from '../AddWorkspaceOrBoard';





// const cards = mockData.workspaces;

const workspaceService = new WorkspaceService();




function Workspace() {

  const [workspaces, setWorkspaces] = useState([]);
  const [title, setTitle] = useState("");

  
  useEffect(() => {
    workspaceService.getWorkspaces().then((data) => {
    
      data.json().then((data) => {
        setWorkspaces(data.result || []);
      });
    }).catch((e) => {
    });
  }, []);

  const createWorkspace = () => {
    // Get text from textfield
    if(title.length === 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a title!',
      }).then(() => {
        setTitle("");
      });
    }else{
      workspaceService.createWorkspace(title).then((data) => {
        if(!workspaces){
          data.json().then((data) => {
            setWorkspaces(data.result);
            setTitle("");
          });
        }
        else{
          data.json().then((data) => {
            setWorkspaces([...workspaces, data.result]);
            setTitle("");
          });
        }  
      }).catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        }).then(() => {
          setTitle("");
        });
      });
    }
  }

  const handleDeleteWorkspace = async (id) => {
    const result = await workspaceService.deleteWorkspace(id);
    
    if(result.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Workspace deleted!',
      });
      // Remove the deleted workspace from the list
      setWorkspaces(workspaces.filter((workspace) => workspace._id !== id));

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleUpdateWorkspace = async (id, title) => {
    const result = await workspaceService.updateWorkspace(id, title);
    
    if(result.status !== 200){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
    return result;
  }


  return (
    <Base title="Workspaces">
        <Container sx={{ py: 8 }}>

          
          <AddWorkspaceOrBoard 
          addWorkspaceOrBoard={createWorkspace}
          text={"workspace"}
          title={title}
          handler={setTitle} />
          {/* End hero unit */}
          <Grid container spacing={4}>
            
            {
            workspaces.map((workspace) => (
              <Grid item key={workspace._id} xs={12} sm={6} md={4}>
                <WorkspaceCard 
                entity={"Workspace"} 
                handleUpdate={handleUpdateWorkspace}
                handleDelete={handleDeleteWorkspace} 
                workspaceId={workspace._id} 
                image={workspace._image} 
                title={workspace._title} 
              />
              </Grid>
            ))
            }
          </Grid>
        </Container>
    </Base>
  );
}

export default Workspace;