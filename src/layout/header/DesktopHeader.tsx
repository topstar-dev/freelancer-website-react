import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

export interface PropsInterface {
    pages: { name: string; url: string; }[];
    userMenu: React.ReactNode;
    selectedPage: string;
    setSelectedPage: Function
}

export default function DesktopHeader({ pages, userMenu, selectedPage, setSelectedPage }: PropsInterface) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Box className='rounx-web-header'>
            <Box className='rounx-appbar-section'>
                <Box>
                    <img
                        className='rounx-logo'
                        src="/images/rounx-logo.png"
                        alt="Rounx admin"
                        width="146px"
                        height="40px"
                        onClick={() => setSelectedPage("/")}
                    />
                </Box>
                <Box className='rounx-nav-item-group'>
                    {pages.map((page) => (
                        <div
                            className={selectedPage === page.url ?
                                'rounx-nav-item menu-item-selected'
                                :
                                'rounx-nav-item'
                            }
                            key={page.name}
                            onClick={() => setSelectedPage(`${page.url}`)}
                        >
                            {page.name}
                        </div>
                    ))}
                </Box>
            </Box>
            <Box className='rounx-tools-section'>
                <TextField
                    className='rounx-search-bar'
                    placeholder={t('header-search-freelancers')}
                    InputProps={{
                        className: 'rounx-search-input',
                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                    }}
                />
                {userMenu}
            </Box>
        </Box>
    )
}