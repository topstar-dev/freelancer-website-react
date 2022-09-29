import { Box, Avatar, Badge, Paper, Typography, Chip, styled, Stack } from "@mui/material";
import React from "react";
import { FlexBox } from "../../../commonStyle/CommonStyle";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarRateIcon from '@mui/icons-material/StarRate';
import DateRangeIcon from '@mui/icons-material/DateRange';
const StyledBadge = styled(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {

		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		// '&::after': {
		//   position: 'absolute',
		//   top: 0,
		//   left: 0,
		//   width: '100%',
		//   height: '100%',
		//   borderRadius: '50%',
		//   animation: 'ripple 1.2s infinite ease-in-out',
		//   border: '1px solid currentColor',
		//   content: '""',
		// },
	},
	// '@keyframes ripple': {
	//   '0%': {
	//     transform: 'scale(.8)',
	//     opacity: 1,
	//   },
	//   '100%': {
	//     transform: 'scale(2.4)',
	//     opacity: 0,
	//   },
	// },
}));

export default function FreelancersList() {
	return (
		<Paper style={{ padding: '20px' }} variant="outlined">
			<Stack direction='row' spacing={3}>
				<StyledBadge
					overlap="circular"
					anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
					variant="dot"
				>
					<Avatar alt="Remy Sharp" src="/avatar.png" />
				</StyledBadge>
				<Stack spacing={1} marginLeft={3}>
					<Typography style={{ fontSize: '20px' }}>
						Perry Lance
					</Typography>
					<Stack spacing={2} direction='row' >
						<FlexBox alignItems='flex-start'>
							<LocationOnIcon style={{ color: '#ea4335', height: '20px' }} />
							<Typography fontSize='14px' color='#757575'>China</Typography>
						</FlexBox>
						<FlexBox alignItems='flex-start'>
							<StarRateIcon style={{ color: '#fbbc05', height: '20px' }} />
							<Typography fontSize='14px' color='#757575'>4.3</Typography>
						</FlexBox>
						<FlexBox alignItems='flex-start'>
							<DateRangeIcon style={{ color: '#34a853', height: '20px' }} />
							<Typography fontSize='14px' color='#757575'>2016-03-12</Typography>
						</FlexBox>
					</Stack>
					<Typography>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam in scelerisque sem. Mauris volutpat, dolor id...
					</Typography>
					<Stack direction='row' spacing={2}>
						<Chip sx={{ width: 'fit-content' }} label='Android' variant="outlined" />
						<Chip sx={{ width: 'fit-content' }} label='Android' variant="outlined" />
					</Stack>
				</Stack>
			</Stack>
		</Paper>
	)

}