import './App.css';
import { makeStyles } from '@material-ui/core';
import KanbanList from './components/KanbanList';
import backgrounImage from './images/background.jpg';
import AddCardOrList from './components/AddCardOrList';

function App() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <KanbanList />
        <KanbanList />
        <KanbanList />
        <KanbanList />
        <div>
          <AddCardOrList type="list" />
        </div>
      </div>
    </div>
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
