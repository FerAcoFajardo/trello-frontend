import {InputBase, makeStyles, Typography} from "@material-ui/core"
import { MoreHoriz } from "@material-ui/icons"
import { useContext, useState } from "react";
import contextAPI from "../utils/contextAPI";

function ListTitle({title, listId}) {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const {updateColumnTitle} = useContext(contextAPI);
    const handleBlur = () => {
        updateColumnTitle(newTitle, listId);
        setOpen(false);
    }
    return (


        <>
            {open ? ( 
                <InputBase 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    autoFocus
                    onBlur={handleBlur}
                    fullWidth
                    inputProps={{className:classes.input}}
                />

            ) : (
                <div className={classes.title}>
                    <Typography className={classes.titleText} onClick={() =>setOpen(true)}>
                        {newTitle}
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
        margin: theme.spacing(1.9),
        '&:focus': {
            background: '#ddd',

        }
    }
}))

export default ListTitle