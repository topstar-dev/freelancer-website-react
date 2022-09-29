import React from 'react'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    DialogActions,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Box,
    Divider,
    Typography,
    Chip
} from "@mui/material"

export default function NameAndPhotos() {
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
            <Typography pl={3} pt={3} pb={1}>Name and photos</Typography>
            <Typography pl={3} pb={1}>Step 2 of 6</Typography>
            <Divider />
            <Box p={3}>
                <TextField fullWidth sx={{ mb: 2 }} label="First name"></TextField>
                <TextField fullWidth label="Last name"></TextField>
            </Box >
        </Box>

    )
}