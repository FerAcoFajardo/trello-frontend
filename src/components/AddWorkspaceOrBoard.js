import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AddWorkspaceOrBoard = ({ addWorkspaceOrBoard, text, title, handler }) => {


    return ( 
        <Box sx={{display:"flex", alignItems: 'end', justifyContent: 'end', mb:5}} >
            <TextField 
            sx={{mb:1, mr:2}} 
            value={title} 
            onChange={e => handler(e.target.value)} 
            id="standard-basic" 
            label={`Enter ${text} name`} 
            variant="standard" 
            />

            <Button sx={{ mb:1}} 
            onClick={addWorkspaceOrBoard}
            variant="contained"
            >Add {text}</Button>

        </Box>
    );
}

export default AddWorkspaceOrBoard;