import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { pageView } from "../../services/eventTracker";
import { Crisp } from "crisp-sdk-web";
import './contactUs.css';;

export default function ContactUs() {
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = t('title.contact-us');
    pageView(window.location.pathname);
  })

  return (
    <Box className='container'>
      <Typography style={{ fontSize: '24px' }}>{t('contact-us.title')}</Typography>
      <br />
      <br />

      <Box className="contact-us">
        <Box>
          <Box>
            <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>{t('contact-us.name')}</Typography>
            <Typography>Remote work</Typography>
          </Box>
        </Box>
        <Box>
          <Box>
            <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>{t('contact-us.timing-title')}</Typography>
            <Typography>{t('contact-us.timing')}</Typography>
          </Box>
        </Box>
        <Box>
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
              <span>{t('contact-us.online')}: </span>
              <span
                className="primary-color"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  Crisp.chat.open()
                }}
              >
                Send message
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}