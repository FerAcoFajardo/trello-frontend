import { Button, Paper, makeStyles, fade, IconButton } from '@material-ui/core'
import { InputBase } from '@mui/material'
import { useState } from 'react'
import { Clear, MoreHoriz } from '@material-ui/icons'

function AddCardOrListText({type, setOpen}) {
    const [text, setText] = useState('');
    const classes = useStyle();
    return (
        <>
            <Paper className={classes.card}>
                <InputBase 
                    multiline
                    value={text} 
                    onChange={e => setText(e.target.value) } 
                    onBlur={() => { setOpen(false) }}
                    placeholder={type === 'card' ? 'Enter a title for this card...' : 'Enter list title...'}
                    inputProps={{className: classes.input}}
                />
            </Paper>

            <div className={classes.confirm}>
                <div>
                    <Button className={classes.confirmButton}>
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
        '&:focus': {
            background: '#ddd',
        }
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
            background: fade('#5aac44', 0.75),
        },
        margin: theme.spacing(1,0,0,0)
    }
}))

export default AddCardOrListText