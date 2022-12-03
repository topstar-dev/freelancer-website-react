import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { pageView } from "../../services/eventTracker";
import './contactUs.css';
import { useMediaQuery } from "react-responsive";
import { positionChatWidget } from "../../components/TawkProvider";

export default function ContactUs() {
  const { t } = useTranslation();
  const isTabOrMobile = useMediaQuery({ query: '(max-width: 1000.99px)' });

  React.useEffect(() => {
    document.title = t('title.contact-us');
    pageView(window.location.pathname);
    positionChatWidget(isTabOrMobile)
  })

  const openWidget = () => {
    const ifr = document.querySelector('iframe');
    if (ifr) {
      const divTag: any = ifr?.contentDocument?.body?.querySelector('.tawk-button');
      if (divTag) {
        divTag.click();
      }
    }
  }

  React.useEffect(() => {
    positionChatWidget(isTabOrMobile)
  }, [isTabOrMobile])

  return (
    <>
      <Typography style={{ fontSize: '24px' }}>{t('contact-us.title')}</Typography>
      <br />
      <br />

      <Box className="rounx-contact-us">
        <Box>
          <Box>
            <Typography style={{ fontWeight: 'bold', marginBottom: '10px' }}>{t('contact-us.name')}</Typography>
            <Typography>Remote Work</Typography>
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
                  openWidget()
                }}
              >
                {t('send-message')}
              </span>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}