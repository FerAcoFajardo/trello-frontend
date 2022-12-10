import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AddWorkspaceOrBoard = ({ addWorkspaceOrBoard, text, title, handler }) => {


    return ( 
        <Box sx={{display:"flex", alignItems: 'end', justifyContent: 'end', mb:5}} >
            <Button sx={{mr:2, mb:1}} 
            onClick={addWorkspaceOrBoard}
            variant="contained"
            >Create {text}</Button>

            <TextField 
            sx={{mb:1}} 
            value={title} 
            onChange={e => handler(e.target.value)} 
            id="standard-basic" 
            label={`Enter ${text} name`} 
            variant="standard" 
            />
        </Box>
    );
}

export default AddWorkspaceOrBoard;