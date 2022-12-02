import mockData from '../../mockdata.js';
import Base from '../Base';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import WorkspaceCard from '../WorkspaceOrBoardCard';

const cards = mockData.workspaces;

function Workspace() {
  
  return (
    <Base title="Workspaces">
        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <WorkspaceCard entity={"Workspace"} workspaceId={card.id} image={card.image} title={card.title} />
              </Grid>
            ))}
          </Grid>
        </Container>
    </Base>
  );
}

export default Workspace;