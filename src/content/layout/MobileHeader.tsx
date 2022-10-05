import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { Button, InputAdornment, TextField } from "@mui/material";
import { FlexBox } from "../commonStyle/CommonStyle";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useDispatch } from "react-redux";
import { IS_MOBILE } from "../../core/actions/actionType";

export default function MobileHeader() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const pages = [{ name: 'Help', url: '/' }, { name: 'Blog', url: '/' }, { name: 'Contact us', url: '/contact' }, { name: 'About us', url: '/about' }]
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const handleMenu = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const infoClick = (index: number, url: string) => {
		setSelectedIndex(index);
		dispatch({ type: IS_MOBILE });
		navigate(`${url}`);
	}
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar variant="outlined" sx={{ background: '#757575' }} position="static">
				<Toolbar sx={{ backgroundColor: "#ffffff" }}>
					<Box sx={{ flexGrow: 1 }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							color="inherit"
							onClick={() => dispatch({ type: IS_MOBILE })}
						>
							<ClearIcon sx={{ color: "#757575" }} />
						</IconButton>
					</Box>
					<Box sx={{ flexGrow: 1, cursor: "pointer" }}>
						<img
							src="/logo.png"
							alt="Rounx admin"
							width="40px"
							height="40px"
							onClick={() => navigate("/")}
						/>
					</Box>

				</Toolbar>
			</AppBar>
			<TextField sx={{ py: 3 }} fullWidth placeholder="Search freelancers"
				InputProps={{ sx: { height: 40, borderRadius: '20px' }, startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
			<Divider />
			<List>
				{pages.map((page, index) => (
					<ListItemButton
						selected={selectedIndex === index}
						key={page.name}
						onClick={() => infoClick(index, page.url)}>
						{page.name}
					</ListItemButton>
				))}

			</List>
		</Box >
	);
}
