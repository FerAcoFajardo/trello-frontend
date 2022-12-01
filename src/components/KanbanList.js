import {Paper, CssBaseline, makeStyles} from '@material-ui/core';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
import AddCardOrList from './AddCardOrList';
import KanbanCard from './KanbanCard';
import ListTitle from './ListTitle';

const KanbanList = ({list}) => {
    const classes = useStyle();
    const {id, title, cards} = list;
    console.log(id);
    return (
        <Paper className={classes.root}>
            <CssBaseline />
            <ListTitle title={title} listId={id} key={id}/>

            {
                cards.map((card) => {
                    return <KanbanCard card={card} key={card.id} />
                })
            }

            <AddCardOrList type="card" listId={list.id}/>
        </Paper>
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