import { makeStyles } from '@material-ui/core';
import KanbanList from '../KanbanList';
import AddCardOrList from '../AddCardOrList';
import { useState, useEffect, } from 'react';
import ContextAPI from '../../utils/contextAPI.js';
import Base from '../Base';
import { useParams } from "react-router-dom";
import NotFound from './NotFound';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import WorkspaceService from '../../services/workspace.service.js';
import BoardService from '../../services/board.service.js';
import ColumnService from '../../services/column.service.js';
import Swal from 'sweetalert2';
import CardService from '../../services/card.service';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const boardService = new BoardService();
const workspaceService = new WorkspaceService();
const columnService = new ColumnService();


function Board() {
    

    const classes = useStyle();

    let { workspaceId, boardId } = useParams();

    const [boardData, setBoard] = useState(null);
    const [workspaceData, setWorkspace] = useState(null);
    const [cardsColumns, setColumns] = useState([]);
    const [cards, setCards] = useState([]);
    
    useEffect(() => {
        workspaceService.getWorkspace(workspaceId).then((data) => {
            data.json().then((data) => {
            setWorkspace(data.result);
            });
        }).catch((e) => {
            console.log(e);
        });

        boardService.getBoard(boardId).then((data) => {
        
        data.json().then((data) => {
            setBoard(data.result);
        });
        }).catch((e) => {
            console.log(e);
        });

        columnService.getColumnsByBoard(boardId).then((data) => {
        
        data.json().then((data) => {
            setColumns(data.result);
        });
        }).catch((e) => {
            console.log(e);
        });


    }, []);
    

    if (!workspaceId || !boardId) return <NotFound />;
    
    if (!cardsColumns) return <NotFound />;

    
    
    const updateColumnTitle = (newTitle, listId) => {
        columnService.updateColumTitle(listId, newTitle).then((data) => {
            data.json().then((data) => {
                console.log(data);
            });
        }).catch((e) => {
            console.log(e);
        });
    }
    
    const updateCardColum = async (cardId, columnId) => {
        const result = await CardService.updateCardColum(cardId, columnId);
        if(result.status === 200){
            const data = await result.json();
            console.log(data);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonText: 'Ok'
            })
        }
    }

    const addCard = async (text, listId) => {

        const data = await columnService.addCard(text, listId);

        if(data.status === 200){
            const newData = await data.json();

            console.log(newData);
            // cards.push(newData.result);
            // setColumns(cards);
        }else{

        }
    }

    const addList = async (text) => {
        const data = await columnService.createColumn(text, boardId);
        
        if(data.status === 200){
            const newData = await data.json();
            const cardsCopy = cards;
            cards.push(newData.result);
            setCards(cardsCopy);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                confirmButtonText: 'Ok'
            })
        }

    }

    

    const onDragEnd = (result) => {
        const {destination, source, draggableId, type} = result;    
        const destDroppableId = destination?.droppableId;
        const destIndex = destination?.index;
        const sourceDroppableId = source?.droppableId;
        const sourceIndex = source?.index;

        // console.table([{sourceDroppableId, destDroppableId, draggableId}]);
        // console.table([{type, sourceIndex, destIndex}]);
        if (!destination) return;
        if (sourceDroppableId === destDroppableId && sourceIndex === destIndex) return;
        
        if (type === 'list') {
            // const list = workspaceData.lists[draggableId];
            // console.log(result)
            // console.log(list, draggableId);
            // console.log(workspaceData.lists);
            // const lists = Object.values(workspaceData.lists);
            // const lists = workspaceData;
            // lists.splice(sourceIndex, 1);
            // lists.splice(destIndex, 0, list);
            // const newData = {...data};
            // // lists to object
            // const listsObj = {};
            // lists.forEach(list => {
            //     listsObj[list.id] = list;
            // })
            // cardsColumns.forEach((column) => {
            //     if(column.id === draggableId){
            //         column.position = destIndex;
            //     }
            // });
            // setCardsColumns();
            // setData(newData);
            // console.log(newData);
            return;
        }

        // const sourceList = workspaceData.lists[sourceDroppableId];
        // console.log(sourceList);
        // const destList = workspaceData.lists[destDroppableId];
        // const sourceCards = [...sourceList.cards];
        // const destCards = destList === sourceList ? sourceCards : [...destList.cards];
        // const [removed] = sourceCards.splice(sourceIndex, 1);
        // destCards.splice(destIndex, 0, removed);
        // sourceList.cards = sourceCards;
        // destList.cards = destCards;
        // const newData = {...data};
        // newData.workspaces[workspaceId-1].boards[boardId-1].lists[sourceDroppableId] = sourceList;
        // newData.workspaces[workspaceId-1].boards[boardId-1].lists[destDroppableId] = destList;
        // setData(newData);
    }
    //Show spinner while loading, if it takes too long just loads the page
    if(!workspaceData){
        return (
        <Base title="Workspaces">
            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                m: 'auto',

            }}

            >
            <CircularProgress />
            </Box>
        </Base>
        );
    }
    console.log(workspaceData);
    return (
        <Base title={`${workspaceData._title} > ${boardData._title}`}>
            <ContextAPI.Provider value={{updateColumnTitle, addCard, addList}}>
                <div>
                    <DragDropContext onDragEnd={ onDragEnd }>
                        <Droppable droppableId="all-lists" direction="horizontal" type="list">
                            {
                                (provided) => (
                                    <div className={classes.container} ref={provided.innerRef} {...provided.droppableProps}>
                                        {
                                            cardsColumns.map((column, index) => {
                                                return <KanbanList list={column} index={column._id} key={column._id} />
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