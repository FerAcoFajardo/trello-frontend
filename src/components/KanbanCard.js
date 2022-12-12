import { makeStyles, Paper } from '@material-ui/core';
import { useContext } from 'react'
import {Draggable} from 'react-beautiful-dnd';
import MoreOptions from './MoreOptions';
import contextAPI from "../utils/contextAPI";

function KanbanCard({card, index, cards, serCards, handleDeleteCard}) {
    const classes = useStyle();
    return (
        <Draggable draggableId={card.id} index={index} key={card.id}>
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Paper className={classes.kanbanCard} id={card.id}>
                            {card.title}
                            {/* <MoreOptions
                                state={cards}
                                setState={serCards}
                                handleDelete={handleDeleteCard}
                                id={card.id}
                            /> */}
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