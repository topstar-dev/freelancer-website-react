import React from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import axios from 'axios';
import { Formik } from "formik";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import {
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent
} from "@mui/material";
import {
  BlueButton,
  CustomForm,
  DecideButton,
  FlexBox,
  FormBox
} from "../../commonStyle";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const validationSchema = yup.object({
  firstname: yup
    .string()
    .required("First name is required"),
  lastname: yup
    .string()
    .required("Last name is required"),
});

export default function Info(mainProps: any) {
  const navigate = useNavigate();
  const [country, setCountry] = React.useState('');
  const countryChange = (e: SelectChangeEvent) => setCountry(e.target.value);

  const [showPassword, setShowPassword] = React.useState(false);
  const [type, setType] = useSearchParams();
  const [birthday, setBirthday] = React.useState<Dayjs | null>(null);

  const handleChange = (newValue: Dayjs | null) => {
    setBirthday(newValue);
  };

  const headers = {
    "Content-Type": "application/json",
    "Accept-Language": 'en',
    "device-type": 'WEB',
    "page_index": 1,
    "page_size": 10,
  }
  React.useEffect(() => {
    axios.get(`${BASE_URL}/countries`, { headers: headers })
      .then((res) => { console.log(res.data); return res.data.data })
      .catch((error) => {
        console.log(error);
      });
    //countryList().getData();
  }, []);

  return (
    <Formik
      initialValues={{
        firstname: "",
        lastname: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mainProps.handleNext();
        const params = {
          firstname: `${values.firstname}`,
          lastname: `${values.lastname}`,
          birthday: `${birthday?.toString()}`,
          country_id: `1`
        };
        navigate({
          pathname: '/sign-up',
          search: `?${createSearchParams(params)}`,
        })
      }}
    >
      {props => (
        <CustomForm onSubmit={props.handleSubmit}>
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
              id="firstname"
              name="firstname"
              value={props.values.firstname}
              onChange={props.handleChange}
              error={props.touched.firstname && Boolean(props.errors.firstname)}
              helperText={props.touched.firstname && props.errors.firstname}
              sx={{ mr: 1 }} />
            <TextField
              label="Last name"
              id="lastname"
              name="lastname"
              value={props.values.lastname}
              onChange={props.handleChange}
              error={props.touched.lastname && Boolean(props.errors.lastname)}
              helperText={props.touched.lastname && props.errors.lastname} />
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
          {/* <FormControl>
        <InputLabel>Country/Region</InputLabel>
        <Select
          label="Country/Region"
          value={country}
          onChange={countryChange}
        >

          {options.map((item) => {
            return (
              <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
            )
          })}
        </Select>
      </FormControl> */}
          <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end' }}>
            <DecideButton
              onClick={() => navigate("/sign-in")}
            >
              Back
            </DecideButton>
            <BlueButton type="submit" style={{ float: "right" }}>
              Next
            </BlueButton>
          </Box>
        </CustomForm>
      )}
    </Formik>
  );
}
