import {makeStyles, Typography} from "@material-ui/core"
import { MoreHoriz } from "@material-ui/icons"

function ListTitle() {
    const classes = useStyle();
    return (
        <div className={classes.title}>
            <Typography className={classes.titleText}>
                To do
            </Typography>
            <MoreHoriz />
        </div>
    )
}

const useStyle = makeStyles(theme => ({
    title: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(1),
        margin: theme.spacing(1),
    },
    titleText: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        //flexGrow: 1,
    }
}))

export default ListTitle