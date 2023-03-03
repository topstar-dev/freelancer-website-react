import React from "react";
import { useTranslation } from 'react-i18next';
import { Box, Typography } from "@mui/material";
import { pageView } from "../../services/eventTracker";

export default function AboutUs() {
  const { t } = useTranslation();

  React.useEffect(() => {
    document.title = t('title.about-us')
    pageView(window.location.pathname)
  })

  return (
    <Box className='container'>
      <Typography style={{ fontSize: '24px' }}>{t('about-us')}</Typography>
      <br />
      <br />

      <Typography marginBottom='10px'>
        <span style={{ fontWeight: 'bold' }}>2016 - </span>
        <span>{t('about-us-2016')}</span>
      </Typography>

      <Typography marginBottom='10px'>
        <span style={{ fontWeight: 'bold' }}>2020 - </span>
        <span>{t('about-us-2020')}</span>
      </Typography>
      <Typography marginBottom='10px'>
        <span style={{ fontWeight: 'bold' }}>2021 - </span>
        <span>{t('about-us-2021')}</span>
      </Typography>
      <Typography marginBottom='10px'>
        <span style={{ fontWeight: 'bold' }}>2022 - </span>
        <span>{t('about-us-2022')}</span>
      </Typography>
    </Box>
  )
}