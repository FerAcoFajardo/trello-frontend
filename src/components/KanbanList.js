import {Paper, CssBaseline, makeStyles} from '@material-ui/core';
import { Draggable, Droppable } from 'react-beautiful-dnd';
// import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import AddCardOrList from './AddCardOrList';
import KanbanCard from './KanbanCard';
import ListTitle from './ListTitle';

const KanbanList = ({list, index}) => {
    const classes = useStyle();
    const {id, title, cards} = list;
    
    return (
        <Draggable draggableId={id} key={id} index={index}>
            {
                (provided) => (
                    <div {...provided.draggableProps} ref={provided.innerRef}>
                        <Paper className={classes.root} {...provided.dragHandleProps}>
                            <CssBaseline />
                            <ListTitle title={title} listId={id} key={id}/>

                            <Droppable droppableId={id}>
                                {
                                    (providedDrop) => (
                                        <div ref={providedDrop.innerRef} {...providedDrop.droppableProps}>
                                            {
                                                cards.map((card, index) => {
                                                    return <KanbanCard card={card} key={card.id} index={index} />
                                                })
                                            }
                                            {providedDrop.placeholder}
                                        </div>
                                    )
                                }
                            </Droppable>
                            <AddCardOrList type="card" listId={list.id}/>
                        </Paper>
                    </div>
                )
            }
        </Draggable>
    )
}

const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        height: '100%',
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        backgroundColor: '#EBECF0',
        borderRadius: '3px',
    },
    listTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1),
    },
    listTitleText: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        
    }
}))

export default KanbanList