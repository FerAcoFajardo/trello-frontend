import {InputBase, makeStyles, Typography} from "@material-ui/core"
import { useContext, useState } from "react";
import ColumnService from '../services/column.service.js';

import MoreOptions from "./MoreOptions";

import contextAPI from "../utils/contextAPI";
import Swal from "sweetalert2";
const columnService = new ColumnService();

function ListTitle({title, columnId}) {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const {updateColumnTitle, columns, setColumns} = useContext(contextAPI);
    const handleBlur = () => {
        updateColumnTitle(newTitle, columnId);
        setOpen(false);
    }

    const handleDeleteColumn = async (id) => {
        let success = false;
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        if(result.isConfirmed){
            const response = await columnService.deleteColumn(id);
            if (response.status === 200) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
                success = true;
            }
        }
        return success;
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
                    <MoreOptions
                        state={columns}
                        setState={setColumns}
                        handleDelete={handleDeleteColumn}
                        id={columnId}
                    />
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