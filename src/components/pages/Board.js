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
    
    return (
        <Base title={workspaceData.title}>
            <ContextAPI.Provider value={{updateColumnTitle, addCard, addList}}>
                <div>
                    <div className={classes.container}>
                    {
                        Object.keys(workspaceList).map((key) => {
                            return <KanbanList list={workspaceList[key]} key={key} />
                        })
                    }
                    <div>
                        <AddCardOrList type="list" />
                    </div>
                    </div>
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