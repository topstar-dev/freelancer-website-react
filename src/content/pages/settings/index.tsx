import React from "react";
import { Box, Grid, Select, Typography, FormControl, InputLabel, SelectChangeEvent, MenuItem } from "@mui/material";
import SettingsList from "./SettingsList";
import { Outlet, useNavigate } from "react-router-dom";
import MediaQuery from 'react-responsive'

export default function Settings() {
	const [url, setUrl] = React.useState('');
	const navigate = useNavigate();
	const handleChange = (event: SelectChangeEvent) => {
		setUrl(event.target.value as string);
		navigate(event.target.value);
	};
	return (
		<Box style={{ margin: '5% 15%' }}>
			<Grid container>
				<>
					<MediaQuery maxWidth='900px'>
						<Typography fontSize='24px' variant='h6' mb={3}> Settings </Typography>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Settings</InputLabel>
							<Select
								value={url}
								label="Settings"
								onChange={handleChange}
							>
								<MenuItem value={'/settings/personal'}>Personal Info</MenuItem>
								<MenuItem value={'/settings/security'}>Security</MenuItem>
								<MenuItem value={'/settings/currency'}>Currency</MenuItem>
							</Select>
						</FormControl>
					</MediaQuery>
					<MediaQuery minWidth='901px'>
						<Grid item md={4} lg={3}>
							<SettingsList />
						</Grid>
					</MediaQuery>
				</>
				<Grid item xs={0} md={1} lg={1}></Grid>
				<Grid item xs={12} md={7} lg={8}>
					<Outlet />
				</Grid>
			</Grid>
		</Box>
	);
}
