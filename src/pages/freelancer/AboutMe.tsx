import React from 'react'
import {
    Select,
    MenuItem,
    TextField,
    Box,
    Divider,
    Typography
} from "@mui/material"

export default function AboutMe() {
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
            <Typography pl={3} pt={3} pb={1}>About me</Typography>
            <Typography pl={3} pb={1}>Step 6 of 6</Typography>
            <Divider />
            <Box p={3}>
                <TextField fullWidth helperText="Write a short summary of your professional experience" label="About"></TextField>
                <br />
                <br />

                <Select
                    fullWidth
                    value={category}
                    onChange={categoryChange}
                    label="Occupational categories"

                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
                <br />
                <br />

                <Select
                    fullWidth
                    value={category}
                    onChange={categoryChange}
                    label="Occupational categories"

                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </Box >
        </Box>

    )
}