import {Paper, CssBaseline, makeStyles} from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import AddCardOrList from './AddCardOrList';
import KanbanCard from './KanbanCard';
import ListTitle from './ListTitle';
import CardService from '../services/card.service.js';
import contextAPI from "../utils/contextAPI";

const columnService = new CardService();

const KanbanList = ({column, index}) => {
    const classes = useStyle();
    const [cards, setCards] = useState([]);
    
    const {columns, setColumns} = useContext(contextAPI);

    useEffect(() => {

        columnService.getCardsByColumn(column.id)
        .then((response) => response.json())
        .then((data) => setCards(data.result || []))
        .catch((e) => console.log(e));
    
    }, [])
    
    
    const handleDeleteCard = (cardId) => {
        setCards(cards.filter(card => card.id !== cardId));
    }
    return (
        <Draggable draggableId={column.id} key={column.id} index={index}>
            {
                (provided) => (
                    <div {...provided.draggableProps} ref={provided.innerRef}>
                        <Paper className={classes.root} {...provided.dragHandleProps}>
                            <CssBaseline />
                            <ListTitle 
                                state={columns}
                                setState={setColumns}
                                title={column.title} 
                                columnId={column.id} 
                                key={column.id}
                            />

                            <Droppable droppableId={column.id}>
                                {
                                    (providedDrop) => (
                                        <div ref={providedDrop.innerRef} {...providedDrop.droppableProps}>
                                            {
                                                cards?.map((card, index) => {
                                                    
                                                    return <KanbanCard 
                                                        card={card} 
                                                        key={card.id} 
                                                        index={index}
                                                        cards={cards}
                                                        setCards={setCards} 
                                                        handleDeleteCard={handleDeleteCard}
                                                    />
                                                })
                                            }
                                            {providedDrop.placeholder}
                                            {/* de momento */}
                                            <AddCardOrList 
                                                type="card" 
                                                columnId={column.id}
                                                cards={cards}
                                                setCards={setCards}
                                            />
                                        </div>
                                    )
                                }
                            </Droppable>
                            {/* <AddCardOrList type="card" listId={list.id}/> */}
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