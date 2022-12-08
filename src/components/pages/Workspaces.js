import mockData from '../../mockdata.js';
import Base from '../Base';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import WorkspaceCard from '../WorkspaceOrBoardCard';
import { useState } from 'react';
import WorkspaceService from '../../services/workspace.service.js';
// const cards = mockData.workspaces;

const workspaceService = new WorkspaceService();

function Workspace() {

  const [workspaces, setWorkspaces] = useState([]);
  const handleCreateWorkspace = async () => {
      const data = await workspaceService.getWorkspaces();
      console.log(data);
      // setWorkspaces(workspaceService.getWorkspaces());
  }

  handleCreateWorkspace();
  
  return (
    <Base title="Workspaces">
        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {workspaces.map((workspace) => (
              <Grid item key={workspace._id} xs={12} sm={6} md={4}>
                <WorkspaceCard entity={"Workspace"} workspaceId={workspace._id} image={workspace._image} title={workspace._title} />
              </Grid>
            ))}
          </Grid>
        </Container>
    </Base>
  );
}

export default Workspace;