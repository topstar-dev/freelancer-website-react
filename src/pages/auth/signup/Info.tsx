import React from "react";
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
  FormControl,
  FormHelperText,
  Autocomplete
} from "@mui/material";
import {
  FlexBox,
} from "../../commonStyle";
import Button from "../../../components/button/Button";

export default function Info(mainProps: any) {
  const { t } = useTranslation();
  const { formik } = mainProps;

  const [country, setCountry] = React.useState((mainProps.countries && mainProps.countries.find((e: any) => e.id === formik.values.country_id)) || null);
  const [birthday, setBirthday] = React.useState<Dayjs | null>(formik.values.birthday || null);

  const countryChange = (e: any) => {
    formik.setFieldValue('country_id', e ? e.id : '')
    setCountry(e ? e : null);
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
      <LocalizationProvider adapterLocale={`${localStorage.getItem('i18nextLng')}`.toLowerCase()} dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={birthday ? '' : t('birthday')}
          inputFormat="YYYY-MM-DD"
          value={birthday}
          mask={t('birthday')}
          onChange={handleChange}
          maxDate={dayjs()}
          renderInput={(params: any) => {
            const newParams = {
              ...params,
              inputProps: {
                ...params.inputProps,
                placeholder: ''
              }
            }
            return <TextField
              {...newParams}
              error={formik.touched.birthday && Boolean(formik.errors.birthday)}
              helperText={formik.touched.birthday && formik.errors.birthday}
            />
          }
          }
        />
      </LocalizationProvider>
      <FormControl error={formik.touched.country_id && Boolean(formik.errors.country_id)}>
        <Autocomplete
          disablePortal
          blurOnSelect
          id="combo-box-demo"
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={country}
          onInputChange={(e, value) => countryChange(value)}
          onChange={(e: any, newValue: string) => countryChange(newValue)}
          options={mainProps.countries || []}
          renderInput={(params) => <TextField {...params} error={formik.touched.country_id && Boolean(formik.errors.country_id)} label={t('country')} />}
        />
        {formik.touched.country_id && formik.errors.country_id && <FormHelperText>{formik.errors.country_id}</FormHelperText>}
      </FormControl>
      <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => {
          formik.validateForm().then((res: any) => {
            const { first_name, last_name, birthday, country_id } = res;
            if (first_name) {
              formik.setFieldTouched('first_name', true, true);
              formik.setFieldError('first_name', first_name);
            }
            if (last_name) {
              formik.setFieldTouched('last_name', true, true);
              formik.setFieldError('last_name', last_name);
            }
            if (birthday) {
              formik.setFieldTouched('birthday', true, true);
              formik.setFieldError('birthday', birthday);
            }

            if (country_id) {
              formik.setFieldTouched('country_id', true, true);
              formik.setFieldError('country_id', country_id);
            }

            if (!(first_name || last_name || birthday || country_id)) {
              mainProps.handleNext({
                first_name: formik.values.first_name,
                last_name: formik.values.last_name,
                birthday: formik.values.birthday,
                country_id: formik.values.country_id,
                password: '',
                confirm_password: '',
                primary_email: '',
                email_code: ''
              }, formik);
            }
          })
        }}>
          {t('next')}
        </Button>
      </Box>
    </>
  );
}
