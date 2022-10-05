import React from "react";
import {
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
import { BlueButton, CustomForm, DecideButton, FlexBox, FormBox } from "../../commonStyle/CommonStyle";
import { useNavigate } from "react-router-dom";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useInfo from "./customHooks/useInfo";
export default function Info(props: any) {
  const navigate = useNavigate();
  const { formik, birthday, handleChange, options, country, countryChange } = useInfo(props.handleNext);
  return (
    <CustomForm onSubmit={formik.handleSubmit}>
      <img
        src="logo.png"
        alt="Rounx admin"
        width="90px"
        height="90px"
        style={{ color: "#336def", alignSelf: "center" }}
      />
      <Typography
        style={{
          fontSize: "20px",
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
          value={formik.values.firstname}
          onChange={formik.handleChange}
          error={formik.touched.firstname && Boolean(formik.errors.firstname)}
          helperText={formik.touched.firstname && formik.errors.firstname}
          sx={{ mr: 1 }} />
        <TextField
          label="Last name"
          id="lastname"
          name="lastname"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.touched.lastname && Boolean(formik.errors.lastname)}
          helperText={formik.touched.lastname && formik.errors.lastname} />
      </FlexBox>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Birthday"
          inputFormat="YYYY-MM-DD"
          value={birthday}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
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
  );
}
