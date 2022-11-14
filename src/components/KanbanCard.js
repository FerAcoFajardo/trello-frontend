import { makeStyles, Paper } from '@material-ui/core';
import React from 'react'

function KanbanCard() {
    const classes = useStyle();
    return (
        <Paper className={classes.kanbanCard}>
            Card
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