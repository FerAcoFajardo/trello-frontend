import mockData from '../../mockdata.js';
import Base from '../Base';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import WorkspaceCard from '../WorkspaceOrBoardCard';
import { useState, useEffect, useCallback } from 'react';
import WorkspaceService from '../../services/workspace.service.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


// const cards = mockData.workspaces;

const workspaceService = new WorkspaceService();




function Workspace() {

  const [workspaces, setWorkspaces] = useState([]);

  // const handleLoadWorkspaces = useCallback(async () => {
    
  // }, []);
  
  
  useEffect(() => {
    workspaceService.getWorkspaces().then((data) => {
    
      data.json().then((data) => {
        setWorkspaces(data);
      });
    }).catch((e) => {
      console.log(e);
    });
  }, []);

  if(!workspaces.result) return (
    <Box sx={{ display: 'flex' }}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
    </Box>
  )
  

  return (
    <Base title="Workspaces">
        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            
            {
            workspaces.result.map((workspace) => (
              <Grid item key={workspace._id} xs={12} sm={6} md={4}>
                <WorkspaceCard entity={"Workspace"} workspaceId={workspace._id} image={workspace._image} title={workspace._title} />
              </Grid>
            ))
            }
          </Grid>
        </Container>
    </Base>
  );
}

export default Workspace;