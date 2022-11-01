import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTawkRef } from "../TawkProvider";
import { pageView } from "../../services/eventTracker";

export default function ContactUs() {
  const { t } = useTranslation();
  const tawkObj = useTawkRef();
  React.useEffect(() => {
    document.title = t('title.contact-us');
    pageView(window.location.pathname)
  })

  React.useEffect(() => {
    if (tawkObj) {
      tawkObj.showWidget();
    }

    return () => {
      if (tawkObj) {
        tawkObj.hideWidget();
      }
    }
  }, [tawkObj])

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
              <span>{t('contact-us.customer')}: </span>
              <span className="primary-color" style={{ cursor: 'pointer' }}>
                <a className="primary-color" style={{ textDecoration: 'none' }} href="mailto:support@rounx.com">
                  support@rounx.com
                </a>
              </span>
            </Typography>
            <Typography>
              <span>{t('contact-us.business')}: </span>
              <span className="primary-color">
                <a className="primary-color" style={{ textDecoration: 'none' }} href="mailto:business@rounx.com">business@rounx.com</a>
              </span>
            </Typography>
            <Typography>
              <span>{t('contact-us.online')}: </span>
              <span
                className="primary-color"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  tawkObj.maximize();
                }}
              >
                {t('send-message')}
              </span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}