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
  Chip,
  Stack
} from "@mui/material"

export default function Skills() {
  //from axios request

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
  ];
  const [category, setCategory] = React.useState('');

  const categoryChange = (e: any) => {
    setCategory(e.target.value)
  }
  const handleDelete = () => {
    //something do with API
    console.log('deleted');
  }
  return (
    <Box>
      <Typography pl={3} pt={3} pb={1}>Skills</Typography>
      <Typography pl={3} pb={1}>Step 1 of 6</Typography>
      <Divider />
      <Box p={3}>
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
        <br />
        <br />
        <Divider />
        <br />
        <Typography>Selected skills</Typography>
        <br />
        <Stack direction='row' spacing={1}>
          <Chip variant='outlined' onDelete={handleDelete} label="Android" />
        </Stack>
      </Box >
    </Box>

  )
}