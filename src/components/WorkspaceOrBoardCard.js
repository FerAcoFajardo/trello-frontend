import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import WorkspaceService from '../services/workspace.service.js';
import Swal from 'sweetalert2';


const workspaceService = new WorkspaceService();


function WorkspaceCard(props) {

  

  const url = (props.entity === "Workspace") 
                ? `/workspaces/${props.workspaceId}/boards`
                : `/workspaces/${props.workspaceId}/boards/${props.cardId}`;
  const id = (props.entity === "Workspace")
                ? props.workspaceId
                : props.cardId;

  const handleDeleteCardBoard = () => {
    props.handleDelete(id);
  }

        
  return (
    <Card
        sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column'}}
    >
        {/* <CardMedia
          component="img"
          height="120"
          image={props.image}
          alt="random"
          
        /> */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
              {props.title}
          </Typography>
        </CardContent>
        <CardActions  style={{justifyContent: 'center'}}>
          <Button size="small" href={url}>View</Button>
          <Button size="small">Edit</Button>
          <Button size="small" onClick={handleDeleteCardBoard}>Remove</Button>
        </CardActions>
    </Card>
  );
}

export default WorkspaceCard;
