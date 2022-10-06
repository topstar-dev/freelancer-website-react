import * as React from "react";
import { useTranslation } from 'react-i18next';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useDispatch } from "react-redux";
import { IS_MOBILE } from "../../core/actions/actionType";

export default function MobileHeader() {
	const { t } = useTranslation();
	const pages = [{ name: t('header-help'), url: '/' }, { name: t('header-blog'), url: '/' }, { name: t('header-contact-us'), url: '/contact' }, { name: t('header-about-us'), url: '/about' }]
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [selectedIndex, setSelectedIndex] = React.useState(0);

	const infoClick = (index: number, url: string) => {
		setSelectedIndex(index);
		dispatch({ type: IS_MOBILE });
		navigate(`${url}`);
	}

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
			<TextField sx={{ py: 3 }} fullWidth placeholder={t('header-search-freelancers')}
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
