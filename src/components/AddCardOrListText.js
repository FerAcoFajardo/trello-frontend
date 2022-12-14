import { Button, Paper, makeStyles, alpha, IconButton } from '@material-ui/core'
import { InputBase } from '@mui/material'
import { useContext, useState } from 'react'
import { Clear, MoreHoriz} from '@material-ui/icons'
import contextAPI from '../utils/contextAPI.js';
import Swal from 'sweetalert2';

function AddCardOrListText({type, setOpen, columnId}) {
    const [text, setText] = useState('');
    const classes = useStyle();
    const {columns, setColumns, createCard , createColumn} = useContext(contextAPI);
    const cards = columns?.find(col => col.id === columnId)?.cards;

    const handleAddCardOrList = () => {
        if(type === "card"){
            if(text !== ""){
                createCard(text, columnId);
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter a title for this card!',
                })
            };
        }else{
            if(text !== ""){
                createColumn(text);
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please enter a title for this list!',
                })
            }
        }
        setText("");
        setOpen(false);
    }

    return (
        <>
            <Paper className={classes.card}>
                <InputBase 
                    multiline
                    value={text} 
                    onChange={e => setText(e.target.value) } 
                    placeholder={type === 'card' ? 'Enter a title for this card...' : 'Enter list title...'}
                    inputProps={{className: classes.input}}
                />
            </Paper>

            <div className={classes.confirm}>
                <div>
                    <Button className={classes.confirmButton}
                        onClick={handleAddCardOrList}
                    >
                        {type === 'card' ? 'Add Card' : 'Add List'}
                    </Button>
                    <IconButton onClick={() => setOpen(false)}>
                        <Clear />
                    </IconButton>
                </div>

                <IconButton>
                    <MoreHoriz />
                </IconButton>
            </div>
        </>
    )
}

const useStyle = makeStyles(theme => ({
    card: {
        width: 'auto',
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    input: {
        margin: theme.spacing(1),
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    confirm: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(0,1,1,1)
    },
    confirmButton: {
        background: '#5aac44',
        color: '#fff',
        '&:hover': {
            background: alpha('#5aac44', 0.75),
        },
        margin: theme.spacing(1,0,0,0)
    }
}))

export default AddCardOrListText