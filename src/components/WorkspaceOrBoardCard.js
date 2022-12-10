import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Swal from 'sweetalert2';


function WorkspaceCard(props) {

  

  const url = (props.entity === "Workspace") 
                ? `/workspaces/${props.workspaceId}/boards`
                : `/workspaces/${props.workspaceId}/boards/${props.cardId}`;
  const id = (props.entity === "Workspace")
                ? props.workspaceId
                : props.cardId;

  const secondId = (props.entity === "Card") ? props.workspaceId : undefined;

  const handleDeleteCardBoard = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        props.handleDelete(id, secondId);
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
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
