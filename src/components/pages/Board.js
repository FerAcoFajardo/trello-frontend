import { makeStyles } from '@material-ui/core';
import KanbanList from '../KanbanList';
import AddCardOrList from '../AddCardOrList';
import {useEffect, useState} from 'react';
import mockData from '../../mockdata.js';
import ContextAPI from '../../utils/contextAPI.js';
import Base from '../Base';
import { useParams } from "react-router-dom";
import NotFound from './NotFound';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import WorkspaceService from '../../services/workspace.service.js';
import BoardService from '../../services/board.service.js';
import ColumnService from '../../services/column.service.js';
import CardService from '../../services/card.service.js';
import Swal from 'sweetalert2';


const boardService = new BoardService();
const workspaceService = new WorkspaceService();
const columnService = new ColumnService();
const cardService = new CardService();

function Board() {
    const classes = useStyle();

    let { workspaceId, boardId } = useParams();
    
    const [workspace, setWorkspace] = useState(null);
    const [board, setBoard] = useState(null);
    const [columns, setColumns] = useState(null);

    const [data, setData] = useState(mockData);

    
    useEffect(() => {

        if(!workspaceId || !boardId) return;

        // Getting the board
        boardService.getBoard(boardId)
        .then((response) => response.json())
        .then((data) => setBoard(data.result))
        .catch((e) => console.log(e));

        // Getting the workspace
        workspaceService.getWorkspace(workspaceId)
        .then((response) => response.json())
        .then((data) => setWorkspace(data.result))
        .catch((e) => console.log(e));


        columnService.getColumnsByBoard(boardId)
        .then((response) => response.json())
        .then((data) => setColumns(data.result) || [])
        .catch((e) => console.log(e));


    }, []);

    if (!workspaceId || !boardId) return <NotFound text={"Board not found"}/>;
    
    const workspaceData = data.workspaces[workspaceId-1]?.boards[boardId-1];
    if (!board) return <NotFound text={"Board not found!"}/>;

    
    
    const updateColumnTitle = async (newTitle, columnId) => {
        const columnResult = await columnService.updateColumnTitle(columnId, newTitle, boardId);

        if(columnResult.status === 200){
            const result = await columnResult.json();
            setColumns(columns.map((column) => {
                if(column.id === columnId){
                    return result.result;
                }
                    return column;
                }));
        }else if(columnResult.status === 400 || columnResult.status === 500){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }else if(columnResult.status === 404){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Column was not find!',
            })
        }
            
    
    }

    const createCard = async (text, columnId, state, setState) => {
        const response = await cardService.createCard(text, columnId);
        // console.log(response);
        if (response.status === 200) {
            const result = await response.json();
            setState([...state, result.result]);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }

    }

    const createColumn = async (text) => {
        const response = await columnService.createColumn(text, boardId);
        if (response.status === 200) {
            const result = await response.json();
            setColumns([...columns, result.result]);
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
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
            const list = workspaceData.lists[draggableId];
            // console.log(list, draggableId);
            // console.log(workspaceData.lists);
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
            // console.log(newData);
            return;
        }

        const sourceList = workspaceData.lists[sourceDroppableId];
        // console.log(sourceList);
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
        <Base title={`${workspace?.title || 'Workspace'} > ${board?.title || 'Board'}`}>
            <ContextAPI.Provider value={{updateColumnTitle, createCard, createColumn, columns, setColumns}}>
                <div>
                    <DragDropContext onDragEnd={ onDragEnd }>
                        <Droppable droppableId="all-lists" direction="horizontal" type="list">
                            {
                                (provided) => (
                                    <div className={classes.container} ref={provided.innerRef} {...provided.droppableProps}>
                                        {
                                            columns?.map((column, index) => {
                                                // console.log(column);
                                                // console.log(index);
                                                return <KanbanList column={column} index={index} key={column.id} />
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
}));

export default Board;