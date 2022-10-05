import React from 'react'
import {
    TextField,
    Box,
    Divider,
    Typography,
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

export default function Education() {
    const names = [
        'Oliver Hansen',
        'Van Henry',
        'April Tucker',
        'Ralph Hubbard',
        'Omar Alexander',
        'Carlos Abbott',
        'Miriam Wagner',
        'Bradley Wilkerson',
        'Virginia Andrews',
        'Kelly Snyder',
    ];
    const [category, setCategory] = React.useState('');

    const categoryChange = (e: any) => {
        setCategory(e.target.value)
    }
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography pl={3} pt={3} pb={1}>Education</Typography>
                    <Typography pl={3} pb={1}>Step 4 of 6</Typography>
                </Box>
                <AddIcon sx={{ mr: 3 }} />
            </Box>
            <Divider />
            <Box p={3}>
                <TextField fullWidth sx={{ mb: 2 }} label="Major"></TextField>
                <TextField fullWidth sx={{ mb: 2 }} label="School name"></TextField>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField fullWidth sx={{ mb: 2, mr: 2 }} label="Start year"></TextField>
                    <TextField fullWidth sx={{ mb: 2 }} label="End year"></TextField>
                </Box>
                <TextField multiline fullWidth sx={{ mb: 2 }} label="Description"></TextField>
            </Box >
        </Box>

    )
}