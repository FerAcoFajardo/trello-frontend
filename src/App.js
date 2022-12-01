import './App.css';
import { makeStyles } from '@material-ui/core';
import KanbanList from './components/KanbanList';
import backgrounImage from './images/background.jpg';
import AddCardOrList from './components/AddCardOrList';
import Navbar from './components/Navbar';
import {useState} from 'react';
import uuid from "react-uuid";
import mockData from './mockdata.js';
import ContextAPI from './utils/contextAPI.js';





function App() {
  const classes = useStyle();
  const [data, setData] = useState(mockData);


  const updateColumnTitle = (newTitle, listId) => {
    const list = data.lists[listId];
    list.title = newTitle;
    const newState = {
      ...data,
    lists:{
      ...data.lists,
      [listId]: list
    }};
    setData(newState);
  
  }

  const addCard = (text, listId) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title:text
    }

    const list = data.lists[listId];
    const cards = [...list.cards, newCard];
    list.cards = cards
    const newState = {
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    }
    setData(newState);

  }

  const addList = (text) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title:text,
      cards:[]
    }
    const newState = {
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList
      }
    }
    setData(newState);

  }    
  
  return (
    <ContextAPI.Provider value={{updateColumnTitle, addCard, addList}}>
      <div className={classes.root}>
        <div className={classes.container}>
          {
            data.listIds.map((listId) => {
              const list = data.lists[listId];
              
              return <KanbanList list={list} key={listId} />
            })
          }
          <div>
            <AddCardOrList type="list" />
          </div>
        </div>
      </div>
    </ContextAPI.Provider>
  );
}

const useStyle = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    overflowY: 'auto',
    backgroundColor: '#EBECF0',
    backgroundImage: `url(${backgrounImage})`,
    backgroundPosition: 'center',
    backgrounSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    display: 'flex',
  }
}))

export default App;
