import React from "react";
import { useTranslation } from 'react-i18next';
import { Helmet } from "react-helmet";
import { Typography } from "@mui/material";

export default function AboutUs() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>About us - Rounx</title>
      </Helmet>
      <Typography style={{ fontSize: '24px' }}>{t('about-us')}</Typography>
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
    </>
  )
}