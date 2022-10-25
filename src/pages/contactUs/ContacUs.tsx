import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function ContactUs() {
  const { t } = useTranslation();
  React.useEffect(() => {
    document.title = t('title.contact-us')
  })

  return (
    <>
      <Typography style={{ fontSize: '24px' }}>{t('contact-us.title')}</Typography>
      <br />
      <br />

      <Grid container>
        <Grid mb={3} item xs={12} md={12} lg={4}>
          <Box>
            <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>{t('contact-us.name')}</Typography>
            <Typography>Remote Work</Typography>
          </Box>
        </Grid>
        <Grid mb={3} item xs={12} md={12} lg={4}>
          <Box>
            <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>{t('contact-us.timing-title')}</Typography>
            <Typography>{t('contact-us.timing')}</Typography>
          </Box>
        </Grid>
        <Grid mb={3} item xs={12} md={12} lg={4}>
          <Box>
            <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>{t('contact-us.contact-details')}</Typography>
            <Typography>
              <span>{t('contact-us.customer')}:</span>
              <span style={{ color: '#336def', cursor: 'pointer' }}>support@rounx.com</span>
            </Typography>
            <Typography>
              <span>{t('contact-us.business')}: </span>
              <span style={{ color: '#336def', cursor: 'pointer' }}>business@rounx.com</span>
            </Typography>
            <Typography>
              <span>{t('contact-us.online')}: </span>
              <span style={{ color: '#336def', cursor: 'pointer' }}>Send message</span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}