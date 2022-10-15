import React from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

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
  BlueButton,
  CustomForm,
  DecideButton,
  FlexBox,
} from "../../commonStyle";

export default function Info(mainProps: any) {
  const options = mainProps.countries;
  const { formik } = mainProps;

  const navigate = useNavigate();
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
    <CustomForm>
      <img
        src="images/rounx-symbol.png"
        alt="Rounx admin"
        width="60px"
        height="60px"
        style={{ alignSelf: "center" }}
      />
      <Typography
        style={{
          fontSize: "17px",
          textAlign: "center",
          marginTop: "-10px",
          marginBottom: "20px",
        }}
      >
        <span>Create </span>
        <span style={{ fontWeight: "bold" }}>Rounx </span>
        <span>account </span>
      </Typography>
      <FlexBox sx={{ justifyContent: 'space-between' }} >
        <TextField
          label="First name"
          id="first_name"
          name="first_name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
          sx={{ mr: 1 }} />
        <TextField
          label="Last name"
          id="last_name"
          name="last_name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name} />
      </FlexBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Birthday"
          inputFormat="YYYY-MM-DD"
          value={birthday}
          onChange={handleChange}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <FormControl>
        <InputLabel>Country/Region</InputLabel>
        <Select
          label="Country/Region"
          value={country}
          onChange={countryChange}
        >

          {options.map((item: any) => {
            return (
              <MenuItem key={item.country_id} value={item.country_id}>{item.country_name}</MenuItem>
            )
          })}
        </Select>
      </FormControl>
      <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end' }}>
        <DecideButton
          onClick={() => navigate("/sign-in")}
        >
          Back
        </DecideButton>
        <BlueButton style={{ float: "right" }} onClick={() => {
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
          Next
        </BlueButton>
      </Box>
    </CustomForm>
  );
}
