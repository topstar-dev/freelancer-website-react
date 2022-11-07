import React, { ReactNode, useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
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
  Autocomplete,
} from "@mui/material";
import {
  CustomForm,
  FlexBox,
} from "../../commonStyle";
import Button from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import WithTranslateFormErrors from "../../../services/validationScemaOnLangChange";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { getCountries } from "../../../redux/resources/resourcesApi";

export default function Info(mainProps: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');

  const [load, setLoad] = useState(false);
  const { language } = useAppSelector(state => state.resources);
  const [countryData, setCountryData] = useState([]);

  const signupInfo = sessionStorage.getItem('signup-info') ? JSON.parse(`${sessionStorage.getItem('signup-info')}`) : {};
  const [formData] = useState({
    first_name: signupInfo.first_name || "",
    last_name: signupInfo.last_name || "",
    birthday: signupInfo.birthday || null,
    country_id: signupInfo.country_id || null
  });

  const [country, setCountry] = React.useState<any>(formData.country_id ? countryData.find((e: any) => e.id === formData.country_id) : null);
  const [birthday, setBirthday] = React.useState<Dayjs | null>(formData.birthday);

  useEffect(() => {
    document.title = t('title.signup');
    if (signupInfo) {
      const temp = { ...signupInfo };
      delete temp['set_password'];
      delete temp['confirm_password'];
      delete temp['confirm_password'];
      delete temp['primary_email'];
      delete temp['email_code'];
      sessionStorage.setItem('signup-info', JSON.stringify(temp))
    }
  })

  useEffect(() => {
    setLoad(false)
    setCountryData([]);
  }, [language])

  useEffect(() => {
    if (!load && countryData.length <= 0) {
      getCountries().then((res) => {
        const countryArr = res.data.records.map((c: any) => ({
          label: c.country_name,
          id: c.country_id
        }))
        setCountryData(countryArr)
        const country = countryArr.find((e: any) => e.id === formData.country_id)
        setCountry(country)
        setLoad(true);
      }).catch((err) => {
        setLoad(true)
      })
    }
  }, [countryData, load, formData])

  return (
    <Card className={`rounx-auth-card`}>
      <Formik
        initialValues={formData}
        validationSchema={yup.object({
          first_name: yup
            .string()
            .required(t('validation.firstname-required')),
          last_name: yup
            .string()
            .required(t('validation.lastname-required')),
          birthday: yup
            .string()
            .required(t('validation.birthday-required')),
          country_id: yup
            .string()
            .required(t('validation.country-required'))
        })}
        onSubmit={(values) => { }}
      >
        {formik =>
          <WithTranslateFormErrors {...formik}>
            <CustomForm>
              <img
                src="/images/rounx-symbol.png"
                alt="Rounx admin"
                width="60px"
                height="60px"
                style={{ alignSelf: "center", cursor: "pointer" }}
                onClick={() => navigate('/')}
              />
              <Typography className="rounx-account-title-info">
                {t('signup-title')}
              </Typography>
              <FlexBox sx={{ gap: '24px', flexDirection: language === 'en' ? 'row' : 'row-reverse' }} >
                <TextField
                  fullWidth
                  label={t('first-name')}
                  id="first_name"
                  name="first_name"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                  helperText={formik.touched.first_name && formik.errors.first_name as ReactNode}
                />
                <TextField
                  fullWidth
                  label={t('last-name')}
                  id="last_name"
                  name="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                  helperText={formik.touched.last_name && formik.errors.last_name as ReactNode} />
              </FlexBox>
              <LocalizationProvider adapterLocale={`${localStorage.getItem('i18nextLng')}`.toLowerCase()} dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label={birthday ? '' : t('birthday')}
                  inputFormat="YYYY-MM-DD"
                  value={birthday}
                  onChange={(e) => {
                    setBirthday(e);
                    formik.setFieldValue('birthday', dayjs(e).format('YYYY-MM-DD'))
                  }}
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
                  value={country ? country : ''}
                  onInputChange={(e, value) => {
                    if (!value) {
                      formik.setFieldValue('country_id', value)
                      setCountry(value)
                    }
                  }}
                  onChange={(e, value) => {
                    if (value) {
                      formik.setFieldValue('country_id', value.id)
                      setCountry(value)
                    }
                  }}
                  options={countryData}
                  renderInput={(params) => <TextField {...params} error={formik.touched.country_id && Boolean(formik.errors.country_id)} label={t('country')} />}
                />
                {formik.touched.country_id && formik.errors.country_id && <FormHelperText>{formik.errors.country_id as ReactNode}</FormHelperText>}
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

                    // sessionStorage.setItem('signup-type', `${type}`);
                    sessionStorage.setItem('signup-info', JSON.stringify({ ...formik.values, type: type }))
                    // if (!(first_name || last_name || birthday || country_id)) {
                    navigate('/sign-up/set-password')
                    // }
                  })
                }}>
                  {t('next')}
                </Button>
              </Box>
            </CustomForm >
          </WithTranslateFormErrors>
        }
      </Formik>
    </Card>
  );
}
