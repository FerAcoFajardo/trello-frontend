import { makeStyles, Paper } from '@material-ui/core';
import React from 'react'
import {Draggable} from 'react-beautiful-dnd';

function KanbanCard({card, index}) {
    const classes = useStyle();
    return (
        <Draggable draggableId={card.id} index={index} key={card.id}>
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Paper className={classes.kanbanCard} id={card.id}>
                            {card.title}
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