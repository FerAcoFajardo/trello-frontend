import Base from '../Base';
import { useState, useEffect, } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import WorkspaceCard from '../WorkspaceOrBoardCard';
import { useParams } from "react-router-dom";
import NotFound from './NotFound';
import WorkspaceService from '../../services/workspace.service.js';
import BoardService from '../../services/board.service.js';
import Swal from 'sweetalert2';
import AddWorkspaceOrBoard from '../AddWorkspaceOrBoard';



const boardService = new BoardService();
const workspaceService = new WorkspaceService();


function Boards() {

  let { id } = useParams();

  const [boardsData, setBoards] = useState([]);
  const [workspace, setWorkspace] = useState(null);
  const [boardTitle, setBoardTitle] = useState("");

    
  useEffect(() => {
    boardService.getBoardByWorkspace(id).then((data) => {
    
      data.json().then((data) => {
        setBoards(data.result || []);
      }).catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
    }).catch((e) => {
      console.log(e);
    });
    workspaceService.getWorkspace(id).then((data) => {
      data.json().then((data) => {
        setWorkspace(data.result);
      });
    }).catch((e) => {
      console.log(e);
    });

  }, []);

  

  const createBoard = () => {
    // Get text from textfield
    if(boardTitle.length === 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please enter a title!',
      }).then(() => {
        setBoardTitle("");
      });
    }else{
      boardService.createBoard(boardTitle, workspace._id).then((data) => {
        if(!boardsData){
          data.json().then((data) => {
            setBoards(data.result || []);
            setBoardTitle("");
          });
        }else{
          data.json().then((data) => {
            if(data.result){
              setBoards([...boardsData, data.result]);
              setBoardTitle("");
            }
          });
        }  
      }).catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        }).then(() => {
          setBoardTitle("");
        });
      });
    }
  }

  const handleDeleteBoard = async (id) => {
    const result = await boardService.deleteBoard(id);
    
    if(result.status === 200){
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Board deleted!',
      });
      // Remove the deleted workspace from the list
      setBoards(boardsData.filter((board) => board._id !== id));

    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleUpdateBoard = async (id, title) => {
    const result = await boardService.updateBoard(id, title);
    
    if(result.status !== 200){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
    return result;
  }

  if (!id) return <NotFound />;
  
  if (!boardsData) return <NotFound />;

  const title = `${workspace?._title} > Boards`;
  return (
    <Base title={title}>
        <Container sx={{ py: 8 }}>
        <AddWorkspaceOrBoard 
          addWorkspaceOrBoard={createBoard}
          text={"board"}
          title={boardTitle}
          workspaceId={id}
          handler={setBoardTitle} />
          {/* End hero unit */}
          <Grid container spacing={4}>
            {boardsData?.map((board) => (
              <Grid item key={board._id} xs={12} sm={6} md={4}>
                <WorkspaceCard 
                  entity="Board" 
                  workspaceId={id} 
                  cardId={board._id} 
                  image={board.image} 
                  handleUpdate={handleUpdateBoard}
                  handleDelete={handleDeleteBoard} 
                  title={board._title} 
                />
              </Grid>
            ))}
          </Grid>
        </Container>
    </Base>
  );
}

export default Boards;