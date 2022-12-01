import './App.css';
import { makeStyles } from '@material-ui/core';
import KanbanList from './components/KanbanList';
import backgrounImage from './images/background.jpg';
import AddCardOrList from './components/AddCardOrList';
import {useState} from 'react';

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
    
  }

  const addList = (text) => {

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
