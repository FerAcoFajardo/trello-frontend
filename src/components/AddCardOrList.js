import {Collapse, alpha, makeStyles, Paper, Typography} from '@material-ui/core'
import { useState } from "react"
import AddCardOrListText from './AddCardOrListText';

function AddCardOrList({type, listId}) {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
  return (
    <div className={classes.root}>
        <Collapse in={open}>
            <AddCardOrListText type={type} setOpen={setOpen} listId={listId}/>
        </Collapse>

        <Collapse in={!open}>
            <Paper className={classes.AddCardOrListText} onClick={()=> setOpen(true)}>
                <Typography>
                    { type === 'card' ? '+ Add a card' : '+ Add another list' }
                </Typography>
            </Paper>
        </Collapse>

    </div>
  )
}

const useStyle = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0,0,0,0),
        padding: theme.spacing(0,0,0,0),
    },
    AddCardOrListText: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        background: '#EBECF0',
        '&:hover': {
            backgroundColor: alpha('#000', 0.25),
        },
        // backgroundColor: 'transparent',
        boxShadow: 'none'
    }
}))

export default AddCardOrList