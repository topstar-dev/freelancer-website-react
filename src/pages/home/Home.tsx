import React from "react";
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik';
import axios from 'axios';
import { useSnackbar } from "notistack";
import { BlueButton } from "../commonStyle";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const validationSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required")
});

export default function HomePage() {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    return (
        <Box style={{ margin: '5% 15%' }}>
            <Grid container>
                <Grid alignItems='center' display='flex' item xs={12} md={12} lg={5}>
                    <Box>
                        <Typography style={{ fontSize: '40px', fontWeight: 'bold' }}>
                            {t('home-page-heading1')}
                        </Typography>
                        <br />
                        <Typography style={{ fontSize: '24px', color: '#757575' }}>
                            {t('home-page-heading1-details')}
                            <br />
                            <br />
                            {t('home-page-heading1-details2')}
                        </Typography>
                        <br />
                        <BlueButton onClick={() => navigate('./sign-in')}>{t('home-page-join-ronux-button')}</BlueButton>
                    </Box>
                </Grid>
                <Grid item lg={2} />
                <Grid item lg={5} xs={12} md={12} >
                    <img
                        alt="Tools"
                        width='100%'
                        src="images/tools.png" />
                </Grid>
            </Grid>
            <br />
            <Divider />
            <br />
            <Box>
                <Typography style={{ fontSize: '40px', fontWeight: 'bold', justifyContent: 'center', display: 'flex', margin: '5%' }}>{t('home-page-why-ronux')}</Typography>
                <Grid container justifyContent='center'>
                    <Grid item md={12} lg={4}>
                        <Box sx={{ display: { xs: 'flex' }, alignItems: { xs: 'center' }, flexDirection: { xs: 'column' } }} marginRight='30px'>
                            <img alt="Verified User" width='70px' src="images/VerifiedUserIcon.png" />
                            <br />
                            <br />
                            <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>{t('home-page-why-point1')}</Typography>
                            <br />
                            <Typography style={{ fontSize: '18px', color: '#757575' }}>{t('home-page-why-point1-info')}</Typography>
                        </Box>
                    </Grid>
                    <Grid item md={12} lg={4}>
                        <Box sx={{ display: { xs: 'flex' }, alignItems: { xs: 'center' }, flexDirection: { xs: 'column' } }} marginRight='30px'>
                            <img alt="Public Icon" width='70px' src="images/PublicIcon.png" />
                            <br />
                            <br />
                            <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>{t('home-page-why-point2')}</Typography>
                            <Typography style={{ fontSize: '18px', color: '#757575' }}>{t('home-page-why-point2-info')}</Typography>
                            <br />
                        </Box>
                    </Grid>
                    <Grid item md={12} lg={4}>
                        <Box sx={{ display: { xs: 'flex' }, alignItems: { xs: 'center' }, flexDirection: { xs: 'column' } }} marginRight='30px'>
                            <img alt="Code Icon" width='70px' src="images/CodeIcon.png" />
                            <br />
                            <br />
                            <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>{t('home-page-why-point3')}</Typography>
                            <Typography style={{ fontSize: '18px', color: '#757575' }}>{t('home-page-why-point3-info')}</Typography>
                            <br />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <br />
            <br />
            <Divider />
            <br />
            <br />
            <br />
            <Grid container>
                <Grid item lg={5} xs={12} >
                    <Box>
                        <Box sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'center' } }}>
                            <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>{t('home-page-comming-soon')}</Typography>
                        </Box>
                        <br />
                        <Box sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'center' } }}>
                            <Typography sx={{ fontSize: '24px', color: '#757575' }}>
                                {t('home-page-comming-soon-info')}
                            </Typography>
                        </Box>
                        <br />
                        <Formik
                            validationSchema={validationSchema}
                            initialValues={{ email: '' }}
                            onSubmit={(values, actions) => {
                                axios.post(`${BASE_URL}/appointment-email`, {
                                    email: values.email,
                                }, {
                                    headers: {
                                        "Content-Type": "application/json",
                                        "Accept-Language": 'en',
                                        "device-type": 'WEB'
                                    }
                                }).then((res: any) => {
                                    enqueueSnackbar(res.data.message, { variant: 'success' });
                                    actions.resetForm();
                                }).catch((error: any) => {
                                    if (error.response.status === 403) enqueueSnackbar('Email already exists', { variant: 'error' });
                                    if (error.response.status === 400) enqueueSnackbar('Invalid email format', { variant: 'error' });
                                    actions.resetForm();
                                });
                            }}
                        >
                            {props => (
                                <form
                                    onSubmit={props.handleSubmit}
                                    style={{ display: 'flex', alignItems: 'flex-start' }}
                                >
                                    <TextField
                                        value={props.values.email}
                                        id="email"
                                        name="email"
                                        placeholder={t('home-page-comming-soon-email')}
                                        onChange={props.handleChange}
                                        error={props.touched.email && Boolean(props.errors.email)}
                                        helperText={props.touched.email && props.errors.email}
                                        InputProps={{ sx: { height: 40, borderRadius: '20px' } }}
                                        style={{ marginRight: '20px' }}
                                        fullWidth
                                    />
                                    <BlueButton type="submit">{t('home-page-comming-soon-email-button')}</BlueButton>
                                </form>
                            )}
                        </Formik>
                    </Box>
                </Grid>
                <Grid item lg={2}></Grid>
                <Grid item lg={5} xs={12}>
                    <Box sx={{ display: 'flex', mt: { xs: 10 }, justifyContent: { xs: 'center' } }}>
                        <img
                            alt="Mobile phone"
                            height='700px'
                            style={{ marginTop: '30px' }}
                            src="images/SamsungGalaxy.png" />
                        <img
                            alt="Half mobile phone"
                            height='730px'
                            style={{ marginLeft: '-200px', zIndex: '-1' }}
                            src="images/GooglePixel.png" />
                    </Box>
                </Grid>
            </Grid>
        </Box >
    )
}