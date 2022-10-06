import React from "react";
import { useTranslation } from 'react-i18next';
import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BlueButton } from "../../commonStyle/CommonStyle";
import useHome from "./customHooks/useHome";

export default function HomePage() {
  const { t } = useTranslation();
  const { formik } = useHome();
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
            width='100%'
            src="tools.png" />
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
              <img width='70px' src="VerifiedUserIcon.png" />
              <br />
              <br />
              <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>{t('home-page-why-point1')}</Typography>
              <br />
              <Typography style={{ fontSize: '18px', color: '#757575' }}>{t('home-page-why-point1-info')}</Typography>
            </Box>
          </Grid>
          <Grid item md={12} lg={4}>
            <Box sx={{ display: { xs: 'flex' }, alignItems: { xs: 'center' }, flexDirection: { xs: 'column' } }} marginRight='30px'>
              <img width='70px' src="PublicIcon.png" />
              <br />
              <br />
              <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>{t('home-page-why-point2')}</Typography>
              <Typography style={{ fontSize: '18px', color: '#757575' }}>{t('home-page-why-point2-info')}</Typography>
              <br />
            </Box>
          </Grid>
          <Grid item md={12} lg={4}>
            <Box sx={{ display: { xs: 'flex' }, alignItems: { xs: 'center' }, flexDirection: { xs: 'column' } }} marginRight='30px'>
              <img width='70px' src="CodeIcon.png" />
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
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <TextField
                value={formik.values.email}
                id="email"
                name="email"
                placeholder={t('home-page-comming-soon-email')}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{ sx: { height: 40, borderRadius: '20px' } }}
                style={{ marginRight: '20px' }}
                fullWidth
              />
              <BlueButton type="submit">{t('home-page-comming-soon-email-button')}</BlueButton>
            </form>
          </Box>
        </Grid>
        <Grid item lg={2}></Grid>
        <Grid item lg={5} xs={12}>
          <Box sx={{ display: 'flex', mt: { xs: 10 }, justifyContent: { xs: 'center' } }}>
            <img
              height='700px'
              style={{ marginTop: '30px' }}
              src="SamsungGalaxy.png" />
            <img
              height='730px'
              style={{ marginLeft: '-200px', zIndex: '-1' }}
              src="GooglePixel.png" />
          </Box>
        </Grid>
      </Grid>
    </Box >
  )

}