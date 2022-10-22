import React, { useRef } from "react";
import { useTranslation } from 'react-i18next';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import {
  TextField,
  Typography,
  Box,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import {
  FlexBox,
} from "../../commonStyle";
import Button from "../../../components/button/Button";

export default function Info(mainProps: any) {
  const { t } = useTranslation();
  const countryRef = useRef<any>();
  const options = mainProps.countries;
  const { formik } = mainProps;

  const [country, setCountry] = React.useState('');
  const [birthday, setBirthday] = React.useState<Dayjs | null>(null);

  const countryChange = (e: SelectChangeEvent) => {
    formik.setFieldValue('country_id', e.target.value)
    setCountry(e.target.value);
  }

  const handleChange = (newValue: Dayjs | null) => {
    formik.setFieldValue('birthday', dayjs(newValue).format('YYYY-MM-DD'))
    setBirthday(newValue);
  };

  return (
    <>
      <Typography className="rounx-account-title-info">
        {t('signup-title')}
      </Typography>
      <FlexBox sx={{ justifyContent: 'space-between' }} >
        <TextField
          fullWidth
          label={t('first-name')}
          id="first_name"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
          sx={{ mr: '17px' }} />
        <TextField
          fullWidth
          label={t('last-name')}
          id="last_name"
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name} />
      </FlexBox>
      <LocalizationProvider locale={`${localStorage.getItem('i18nextLng')}`.toLowerCase()} dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={t('birthday')}
          inputFormat="YYYY-MM-DD"
          value={birthday}
          onChange={handleChange}
          renderInput={(params: any) => <TextField {...params}
            inputProps={{ placeholder: "" }} />}
        />
      </LocalizationProvider>
      <FormControl>
        <InputLabel>{t('country')}</InputLabel>
        <Select
          ref={countryRef}
          label={t('country')}
          value={country}
          onChange={countryChange}
          onClose={() => {
            countryRef?.current?.classList?.remove('Mui-focused');
            countryRef?.current?.previousSibling?.classList.remove('Mui-focused');
          }}
        >

          {options.map((item: any) => {
            return (
              <MenuItem key={item.country_id} value={item.country_id}>{item.country_name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => {
          formik.validateForm().then((res: any) => {
            const { first_name, last_name } = res;
            if (first_name) {
              formik.setFieldTouched('first_name', true, true);
              formik.setFieldError('first_name', first_name);
            }
            if (last_name) {
              formik.setFieldTouched('last_name', true, true);
              formik.setFieldError('last_name', last_name);
            }
            if (!first_name && !last_name) {
              mainProps.handleNext();
            }
          })
        }}>
          {t('next')}
        </Button>
      </Box>
    </>
  );
}
