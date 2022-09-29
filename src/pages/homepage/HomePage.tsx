import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { BlueButton } from "../../commonStyle/CommonStyle";
import useHome from "../../customHooks/homepage/useHome";

export default function HomePage() {
  const { formik } = useHome();
  return (
    <Box style={{ margin: '5% 15%' }}>
      <Grid container>
        <Grid alignItems='center' display='flex' item xs={12} md={12} lg={5}>
          <Box>
            <Typography style={{ fontSize: '40px', fontWeight: 'bold' }}>
              Talent First, Client First
            </Typography>
            <br />
            <Typography style={{ fontSize: '24px', color: '#757575' }}>
              Rounx is a remote work platform for people with professional skills.
              <br />
              <br />
              Clients can hire freelancers all over the world to get the job done, Freelancers can find suitable jobs on ﻿this platform.
            </Typography>
            <br />
            <BlueButton>Join Rounx</BlueButton>
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
        <Typography style={{ fontSize: '40px', fontWeight: 'bold', justifyContent: 'center', display: 'flex', margin: '5%' }}>Why Rounx</Typography>
        <Grid container justifyContent='center'>
          <Grid item md={12} lg={4}>
            <Box sx={{ display: { xs: 'flex' }, alignItems: { xs: 'center' }, flexDirection: { xs: 'column' } }} marginRight='30px'>
              <img width='70px' src="VerifiedUserIcon.png" />
              <br />
              <br />
              <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>High quality work</Typography>
              <br />
              <Typography style={{ fontSize: '18px', color: '#757575' }}>Before freelancers join the platform, they go through a rigorous review, and only a few freelancers will pass the review.</Typography>
            </Box>
          </Grid>
          <Grid item md={12} lg={4}>
            <Box sx={{ display: { xs: 'flex' }, alignItems: { xs: 'center' }, flexDirection: { xs: 'column' } }} marginRight='30px'>
              <img width='70px' src="PublicIcon.png" />
              <br />
              <br />
              <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Work-Life Balance</Typography>
              <Typography style={{ fontSize: '18px', color: '#757575' }}>Remote work allows for more flexibility in scheduling, as long as you can complete your work on time, ﻿so you can work as long as you want.</Typography>
              <br />
            </Box>
          </Grid>
          <Grid item md={12} lg={4}>
            <Box sx={{ display: { xs: 'flex' }, alignItems: { xs: 'center' }, flexDirection: { xs: 'column' } }} marginRight='30px'>
              <img width='70px' src="CodeIcon.png" />
              <br />
              <br />
              <Typography style={{ fontSize: '24px', fontWeight: 'bold' }}>Focus on IT industry</Typography>
              <Typography style={{ fontSize: '18px', color: '#757575' }}>Rounx focuses on the IT industry, occupation categories include: front-end back-end development, ﻿design...etc.</Typography>
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
              <Typography sx={{ fontSize: '40px', fontWeight: 'bold' }}>Coming Soon</Typography>
            </Box>
            <br />
            <Box sx={{ display: { xs: 'flex' }, justifyContent: { xs: 'center' } }}>
              <Typography sx={{ fontSize: '24px', color: '#757575' }}>
                Our remote work platform will be online soon,Add your email and become the first Rounx user.
              </Typography>
            </Box>
            <br />
            <form onSubmit={formik.handleSubmit} style={{ display: 'flex', alignItems: 'flex-start' }}>
              <TextField
                value={formik.values.email}
                id="email"
                name="email"
                placeholder="Email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{ sx: { height: 40, borderRadius: '20px' } }}
                style={{ marginRight: '20px' }}
                fullWidth
              />
              <BlueButton type="submit">Submit</BlueButton>
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