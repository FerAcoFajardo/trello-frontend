import * as React from 'react';
import {Typography, InputBase, makeStyles} from '@material-ui/core';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Swal from 'sweetalert2';


function WorkspaceCard(props) {
  const [open, setOpen] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(props.title);
  const classes = useStyle();

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

  const handleBlur = async () => {
    const result = await props.handleUpdate(id, newTitle);
    console.log(result);
    if (result.status === 200) {
      setNewTitle(newTitle);
    }else{
      setNewTitle(props.title);
    }
    setOpen(false);
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
          

          {open ? ( 
                <InputBase 
                  className={useStyle.input}
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    autoFocus
                    onBlur={handleBlur}
                    fullWidth
                    inputProps={{className:classes.input}}
                />

            ) : (
              <Typography gutterBottom variant="h5" component="h2" onClick={() =>setOpen(true)}>
                  {newTitle}
              </Typography>
            )}
        </CardContent>
        <CardActions  style={{justifyContent: 'center'}}>
          <Button size="small" href={url}>View</Button>
          <Button size="small">Edit</Button>
          <Button size="small" onClick={handleDeleteCardBoard}>Remove</Button>
        </CardActions>
    </Card>
  );
}


const useStyle = makeStyles(theme => ({
  input: {
    fontSize: '1.5rem',
    margin: theme.spacing(-0.1),
    '&:focus': {
      background: '#f5f5f5',
    }
  }
}))
export default WorkspaceCard;
