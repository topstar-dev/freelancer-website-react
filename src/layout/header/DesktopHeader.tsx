import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import Button from '../../components/button/Button';
import { returnUrlByLang, useNavigate } from '../../routes/Router';

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
        <Box className='web-header'>
            <Box className='appbar-section'>
                <Box>
                    <img
                        className='logo'
                        src="/images/rounx-logo.png"
                        alt="Rounx"
                        width="146px"
                        height="40px"
                        onClick={() => setSelectedPage("/")}
                    />
                </Box>
                <Box className='nav-item-group'>
                    {pages.map((page) => (
                        <div
                            className={returnUrlByLang(page.url).includes(selectedPage) ?
                                'nav-item menu-item-selected'
                                :
                                'nav-item'
                            }
                            key={page.name}
                            onClick={() => setSelectedPage(`${page.url}`)}
                        >
                            {page.name}
                        </div>
                    ))}
                </Box>
            </Box>
            <Box className='tools-section'>
                <TextField
                    className='search-bar'
                    variant='outlined'
                    placeholder={t('header-search-freelancers')}
                    InputProps={{
                        className: 'search-input',
                        startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>
                    }}
                />
                {userMenu ?
                    userMenu
                    :
                    <Button variant="outlined" className="no-signin-handle" onClick={() => navigate(`/sign-in`)}>{t('signin')}</Button>
                }
            </Box>
        </Box >
    )
}