import React from "react";
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { Backdrop, Box, CircularProgress, Divider, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import { useSnackbar } from "notistack";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import Button from "../../components/button/Button";
import WithTranslateFormErrors from "../../services/validationScemaOnLangChange";
import {
    scheduleAppointment
} from '../../redux/home/homeActions';
import { pageView } from "../../services/eventTracker";
import EmblaCarousel from "../../components/carousal/Carousal";
import './home.css'

export default function HomePage() {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { language } = useAppSelector(state => state.resources);
    const [backdrop, setBackdrop] = React.useState(false);

    React.useEffect(() => {
        document.title = t('title.home');
        sessionStorage.removeItem('signup-info')
        pageView(window.location.pathname)
    })

    return (
        <>
            <Box className="rounx-home-first-section">
                <Box className="rounx-home-first-left">
                    <Box>
                        <Typography className="rounx-home-section-title">
                            {t('home-page-heading1')}
                        </Typography>
                        <div className="rounx-home-section-details">
                            <Typography className="rounx-home-section-info2" style={{ marginBottom: '24px' }}>
                                {t('home-page-heading1-details')}
                            </Typography>
                            <Typography className="rounx-home-section-info2">
                                {t('home-page-heading1-details2')}
                            </Typography>
                        </div>
                        <Button onClick={() => navigate('./sign-in')}>{t('home-page-join-ronux-button')}</Button>
                    </Box>
                </Box>
                <Box className="rounx-home-first-right">
                    <img
                        alt="Skills"
                        className="rounx-home-first-image"
                        src="images/skills.png" />
                </Box>
            </Box>
            <Divider style={{ margin: '96px 0' }} />
            <Box>
                <Typography className="rounx-home-section-title" style={{ textAlign: 'center', marginBottom: '95px' }}>
                    {t('home-page-why-ronux')}
                </Typography>
                <Box className="rounx-home-second-section">
                    <Box className="rounx-home-second-box">
                        <Box>
                            <img alt="Verified User" width='70px' src="images/verified-user-icon.png" />
                            <br />
                            <br />
                            <Typography style={{ fontSize: '24px', fontWeight: '450' }}>{t('home-page-why-point1')}</Typography>
                            <br />
                            <Typography style={{ fontSize: '18px', color: '#757575' }}>{t('home-page-why-point1-info')}</Typography>
                        </Box>
                    </Box>
                    <Box className="rounx-home-second-box" style={{ margin: '0 3%' }}>
                        <Box>
                            <img alt="Public Icon" width='70px' src="images/public-icon.png" />
                            <br />
                            <br />
                            <Typography style={{ fontSize: '24px', fontWeight: '450' }}>{t('home-page-why-point2')}</Typography>
                            <br />
                            <Typography style={{ fontSize: '18px', color: '#757575' }}>{t('home-page-why-point2-info')}</Typography>
                            <br />
                        </Box>
                    </Box>
                    <Box className="rounx-home-second-box">
                        <Box>
                            <img alt="Code Icon" width='70px' src="images/code-icon.png" />
                            <br />
                            <br />
                            <Typography style={{ fontSize: '24px', fontWeight: '450' }}>{t('home-page-why-point3')}</Typography>
                            <br />
                            <Typography style={{ fontSize: '18px', color: '#757575' }}>{t('home-page-why-point3-info')}</Typography>
                            <br />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider style={{ margin: '96px 0' }} />
            <Box className="rounx-home-third-section" style={{ marginBottom: '95px' }}>
                <Box className="rounx-home-third-left">
                    {false ?
                        <Box>
                            <Box>
                                <Typography sx={{ fontSize: '48px', fontWeight: '500' }}>
                                    {t('home-page-default-third')}
                                </Typography>
                            </Box>
                            <Box style={{ margin: '24px 0' }}>
                                <Typography sx={{ fontSize: '24px', color: '#757575' }}>
                                    {t('home-page-default-third-info')}
                                </Typography>
                            </Box>
                            <Box style={{ margin: '24px 0' }}>
                                <img style={{ cursor: "pointer" }} height="50" src="/images/google-play.png" alt="google-play" />
                            </Box>
                        </Box>
                        :
                        <Box>
                            <Box>
                                <Typography sx={{ fontSize: '48px', fontWeight: '500' }}>
                                    {t('home-page-comming-soon')}
                                </Typography>
                            </Box>
                            <Box style={{ margin: '24px 0' }}>
                                <Typography sx={{ fontSize: '24px', color: '#757575' }}>
                                    {t('home-page-comming-soon-info')}
                                </Typography>
                            </Box>
                            {language === 'en' ?
                                <Formik
                                    validationSchema={yup.object({
                                        email: yup
                                            .string()
                                            .required(t('validation.email-required'))
                                    })}
                                    initialValues={{ email: '' }}
                                    onSubmit={(values, actions) => {
                                        setBackdrop(true);
                                        dispatch(scheduleAppointment(values.email))
                                            .then((res) => {
                                                enqueueSnackbar(res.payload.message)
                                                actions.resetForm();
                                                setBackdrop(false);
                                            }).catch((error) => {
                                                enqueueSnackbar(error.message);
                                                actions.resetForm();
                                                setBackdrop(false);
                                            })
                                    }}
                                >
                                    {props => (
                                        <WithTranslateFormErrors {...props}>
                                            <form
                                                onSubmit={props.handleSubmit}
                                                style={{ display: 'flex', alignItems: 'flex-start' }}
                                            >
                                                <TextField
                                                    value={props.values.email}
                                                    id="email"
                                                    name="email"
                                                    placeholder={t('email')}
                                                    onChange={props.handleChange}
                                                    error={props.touched.email && Boolean(props.errors.email)}
                                                    helperText={props.touched.email && props.errors.email}
                                                    InputProps={{ sx: { height: 40, borderRadius: '24px' } }}
                                                    style={{ marginRight: '20px', height: '40px' }}
                                                    fullWidth
                                                />
                                                <Button type="submit">{t('submit')}</Button>
                                            </form>
                                        </WithTranslateFormErrors>
                                    )}
                                </Formik>
                                :
                                <img className="rounx-qr-code-image" alt="rounx-qrcode" src="/images/rounx-qrcode.jpg" />
                            }
                            <Backdrop
                                sx={{ color: '#fff', zIndex: 999 }}
                                open={backdrop}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </Box>
                    }
                </Box>
                <Box className="rounx-home-third-right">
                    <EmblaCarousel mediaByIndex={[
                        "/images/screenshot-1.png",
                        "/images/screenshot-2.png",
                        "/images/screenshot-3.png"
                    ]} />
                </Box>
            </Box>
        </>
    )
}