import { makeStyles, Paper } from '@material-ui/core';
import React from 'react'

function KanbanCard({card}) {
    const classes = useStyle();
    const {id, title} = card;
    return (
        <Paper className={classes.kanbanCard} id={id}>
            {title}
        </Paper>
    )
}

const useStyle = makeStyles(theme => ({
    kanbanCard: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    }
}))

export default KanbanCard