import { makeStyles } from '@material-ui/core';
import KanbanList from '../KanbanList';
import AddCardOrList from '../AddCardOrList';
import {useState} from 'react';
import uuid from "react-uuid";
import mockData from '../../mockdata.js';
import ContextAPI from '../../utils/contextAPI.js';
import Base from '../Base';
import { useParams } from "react-router-dom";
import NotFound from './NotFound';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

function Board() {
    

    const classes = useStyle();
    const [data, setData] = useState(mockData);

    let { workspaceId, boardId } = useParams();
    
    if (!workspaceId || !boardId) return <NotFound />;
    
    const workspaceData = data.workspaces[workspaceId-1]?.boards[boardId-1];
    const workspaceList = data.workspaces[workspaceId-1]?.boards[boardId-1]?.lists
    if (!workspaceList) return <NotFound />;

    
    
    const updateColumnTitle = (newTitle, listId) => {
        const list = workspaceData.lists[listId];
        list.title = newTitle;
        const newData = {...data};
        newData.workspaces[workspaceId-1].boards[boardId-1].lists[listId] = list;
        setData(newData);
    
    }

    const addCard = (text, listId) => {
        const newCardId = uuid();
        const newCard = {
            id: newCardId,
            title:text
        }

        const list = workspaceData.lists[listId];
        const cards = [...list.cards, newCard];
        list.cards = cards
        const dataCopy = {...data};
        dataCopy.workspaces[workspaceId-1].boards[boardId-1].lists[listId] = list;
        setData(dataCopy);

    }

    const addList = (text) => {
        const newListId = uuid();
        const newList = {
        id: newListId,
        title:text,
        cards:[]
        }
        const dataCopy = {...data};
        dataCopy.workspaces[workspaceId-1].boards[boardId-1].lists[newListId] = newList;
        setData(dataCopy);

    }

    const onDragEnd = (result) => {
        const {destination, source, draggableId, type} = result;    
        const destDroppableId = destination?.droppableId;
        const destIndex = destination?.index;
        const sourceDroppableId = source?.droppableId;
        const sourceIndex = source?.index;

        console.table([{sourceDroppableId, destDroppableId, draggableId}]);
        console.table([{type, sourceIndex, destIndex}]);
        if (!destination) return;
        if (sourceDroppableId === destDroppableId && sourceIndex === destIndex) return;
        
        if (type === 'list') {
            const list = workspaceData.lists[draggableId];
            console.log(result)
            console.log(list, draggableId);
            console.log(workspaceData.lists);
            const lists = Object.values(workspaceData.lists);
            lists.splice(sourceIndex, 1);
            lists.splice(destIndex, 0, list);
            const newData = {...data};
            // lists to object
            const listsObj = {};
            lists.forEach(list => {
                listsObj[list.id] = list;
            })
            newData.workspaces[workspaceId-1].boards[boardId-1].lists = listsObj;
            setData(newData);
            console.log(newData);
            return;
        }

        const sourceList = workspaceData.lists[sourceDroppableId];
        console.log(sourceList);
        const destList = workspaceData.lists[destDroppableId];
        const sourceCards = [...sourceList.cards];
        const destCards = destList === sourceList ? sourceCards : [...destList.cards];
        const [removed] = sourceCards.splice(sourceIndex, 1);
        destCards.splice(destIndex, 0, removed);
        sourceList.cards = sourceCards;
        destList.cards = destCards;
        const newData = {...data};
        newData.workspaces[workspaceId-1].boards[boardId-1].lists[sourceDroppableId] = sourceList;
        newData.workspaces[workspaceId-1].boards[boardId-1].lists[destDroppableId] = destList;
        setData(newData);
    }
    
    return (
        <Base title={`${data.workspaces[workspaceId-1].title} > ${workspaceData.title}`}>
            <ContextAPI.Provider value={{updateColumnTitle, addCard, addList}}>
                <div>
                    <DragDropContext onDragEnd={ onDragEnd }>
                        <Droppable droppableId="all-lists" direction="horizontal" type="list">
                            {
                                (provided) => (
                                    <div className={classes.container} ref={provided.innerRef} {...provided.droppableProps}>
                                        {
                                            Object.keys(workspaceList).map((key, index) => {
                                                return <KanbanList list={workspaceList[key]} index={index} key={key} />
                                            })
                                        }
                                        <div>
                                            <AddCardOrList type="list" />
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )
                            }
                        </Droppable>
                    </DragDropContext>
                </div>
            </ContextAPI.Provider>
        </Base>
    );
}

const useStyle = makeStyles(theme => ({
  container: {
    display: 'flex',
  }
}))

export default Board;