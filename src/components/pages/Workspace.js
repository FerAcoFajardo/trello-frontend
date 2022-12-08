import Base from '../Base';
import { useState, useEffect, } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import WorkspaceCard from '../WorkspaceOrBoardCard';
import { useParams } from "react-router-dom";
import NotFound from './NotFound';
import WorkspaceService from '../../services/workspace.service.js';
import BoardService from '../../services/board.service.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';



const boardService = new BoardService();
const workspaceService = new WorkspaceService();


function Boards() {

  let { id } = useParams();

  const [boardsData, setBoards] = useState([]);
  const [workspace, setWorkspace] = useState(null);
    
  useEffect(() => {
      workspaceService.getWorkspace(id).then((data) => {
        data.json().then((data) => {
            setWorkspace(data.result);
        });
      }).catch((e) => {
        console.log(e);
      });

      boardService.getBoardByWorkspace(id).then((data) => {
      
      data.json().then((data) => {
          setBoards(data.result);
      });
      }).catch((e) => {
        console.log(e);
      });
  }, []);

    
  if (!id) return <NotFound />;
  
  if (!boardsData) return <NotFound />;
  
  const title = `${workspace.title} > Tableros`;
  return (
    <Base title={title}>
        <Container sx={{ py: 8 }}>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {boardsData.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <WorkspaceCard entity="Board" workspaceId={workspace.id} cardId={card.id} image={card.image} title={card.title} />
              </Grid>
            ))}
          </Grid>
        </Container>
    </Base>
  );
}

export default Boards;