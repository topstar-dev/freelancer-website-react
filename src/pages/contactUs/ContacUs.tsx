import React from "react";
import { Box, Grid, Typography } from "@mui/material";

export default function ContactUs() {
  React.useEffect(() => {
    document.title = "Contact us - Rounx"
  })

  return (
    <>
      <Typography style={{ fontSize: '24px' }}>Contact us</Typography>
      <br />
      <br />

      <Grid container>
        <Grid mb={3} item xs={12} md={12} lg={4}>
          <Box>
            <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>Rounx Technology (Dalian) Co., Ltd.</Typography>
            <Typography>Remote Work</Typography>
          </Box>
        </Grid>
        <Grid mb={3} item xs={12} md={12} lg={4}>
          <Box>
            <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>Working hours</Typography>
            <Typography>Monday-Friday: 8:00 AM - 5:00 PM UTC+8</Typography>
          </Box>
        </Grid>
        <Grid mb={3} item xs={12} md={12} lg={4}>
          <Box>
            <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>Contact details</Typography>
            <Typography>
              <span>Customer Support: </span>
              <span style={{ color: '#336def', cursor: 'pointer' }}>support@rounx.com</span>
            </Typography>
            <Typography>
              <span>Business Cooperation: </span>
              <span style={{ color: '#336def', cursor: 'pointer' }}>business@rounx.com</span>
            </Typography>
            <Typography>
              <span>Online customer service (24 x 7): </span>
              <span style={{ color: '#336def', cursor: 'pointer' }}>Send message</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}