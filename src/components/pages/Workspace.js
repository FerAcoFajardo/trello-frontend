import mockData from '../../mockdata.js';
import Base from '../Base';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import WorkspaceCard from '../WorkspaceOrBoardCard';
import { useParams } from "react-router-dom";
import NotFound from './NotFound';

function Boards() {

  let { id } = useParams();
    
  if (!id) return <NotFound />;
  
  const boardsData = mockData.workspaces[id-1]?.boards;
  if (!boardsData) return <NotFound />;
  
  const title = `${mockData.workspaces[id-1].title} > Tableros`;
  return (
    <Base title={title}>
        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {boardsData.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <WorkspaceCard entity="Board" workspaceId={id} cardId={card.id} image={card.image} title={card.title} />
              </Grid>
            ))}
          </Grid>
        </Container>
    </Base>
  );
}

export default Boards;