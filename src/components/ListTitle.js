import {InputBase, makeStyles, Typography} from "@material-ui/core"
import { MoreHoriz } from "@material-ui/icons"
import { useState } from "react";

function ListTitle({title}) {
    const classes = useStyle();
    const [open, setOpen] = useState(true);
    const [newTitle, setNewTitle] = useState(title);
    return (


        <>
            {open ? ( 
                <InputBase 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    autoFocus
                    fullWidth
                    inputProps={{className:classes.input}}
                />

            ) : (
                <div className={classes.title}>
                    <Typography className={classes.titleText}>
                        {title}
                    </Typography>
                    <MoreHoriz />
                </div>
            )}
        </>
    )
}

const useStyle = makeStyles(theme => ({
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1),
        margin: theme.spacing(1),
    },
    titleText: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        //flexGrow: 1,
    },
    input: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        margin: theme.spacing(1),
        '&:focus': {
            background: '#ddd',

        }
    }
}))

export default ListTitle