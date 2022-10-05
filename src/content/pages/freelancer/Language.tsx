import React from 'react'
import {
	Select,
	MenuItem,
	Box,
	Divider,
	Typography
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

export default function Language() {
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
					<Typography pl={3} pt={3} pb={1}>Language</Typography>
					<Typography pl={3} pb={1}>Step 5 of 6</Typography>
				</Box>
				<AddIcon sx={{ mr: 3 }} />
			</Box>
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
			</Box >
		</Box>

	)
}