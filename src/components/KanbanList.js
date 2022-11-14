import {Paper, CssBaseline, makeStyles} from '@material-ui/core';
import AddCardOrList from './AddCardOrList';
import KanbanCard from './KanbanCard';
import ListTitle from './ListTitle';

const KanbanList = () => {
    const classes = useStyle();
    return (
        <Paper className={classes.root}>
            <CssBaseline />
            <ListTitle />
            <KanbanCard />
            <KanbanCard />
            <KanbanCard />

            <AddCardOrList type="card" />
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