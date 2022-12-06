import { makeStyles, Paper } from '@material-ui/core';
import React from 'react'
import {Draggable} from 'react-beautiful-dnd';

function KanbanCard({card, index}) {
    const classes = useStyle();
    const {id, title} = card;
    return (
        <Draggable draggableId={id} index={index} key={id}>
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Paper className={classes.kanbanCard} id={id}>
                            {title}
                        </Paper>
                    </div>
                )
            }
        </Draggable>
    )
}

const useStyle = makeStyles(theme => ({
    kanbanCard: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    }
}))

export default KanbanCard