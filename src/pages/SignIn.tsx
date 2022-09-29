import React from "react";

import {
  TextField,
  Button,
  Typography,
  FormControl,
  Box,
  InputAdornment,
  IconButton,
  Popover,
  MenuItem
} from "@mui/material";
import { BlueButton, CustomForm, FormBox } from "./../commonStyle/CommonStyle";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useSignin from "../customHooks/useSignin";


export default function SignIn() {
  const navigate = useNavigate();
  const { formik, handleClickShowPassword, showPassword, typeClick, handleClose, type, open } = useSignin();

  return (
    <FormBox>
      <Box width='500px'>
        <CustomForm onSubmit={formik.handleSubmit}>
          <img
            src="rounx-symbol.png"
            alt="Rounx admin"
            width="90px"
            height="90px"
            style={{ alignSelf: "center" }}
          />
          <Typography
            style={{
              fontSize: "20px",
              textAlign: "center",
              marginTop: "-10px",
              marginBottom: "20px",
            }}
          >
            <span>Sign in </span>
            <span style={{ fontWeight: "bold" }}>Rounx </span>
          </Typography>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <FormControl>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              helperText={formik.touched.password && formik.errors.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Box style={{ margin: "10px 0px" }}>
            <Button
              className="normal-text round-button"
              variant="outlined"
              onClick={() => navigate("/reset-password")}
            >
              Forgot password?
            </Button>
            <BlueButton type="submit" style={{ float: "right" }}>
              Sign in
            </BlueButton>
          </Box>
          <Button className="normal-text round-button" variant="outlined" style={{ width: 'fit-content' }} onClick={typeClick}>
            Create account
          </Button>
          <Popover
            open={open}
            anchorEl={type}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={() => navigate('/sign-up?type="CLIENT"')}>Client account</MenuItem>
            <MenuItem onClick={() => navigate('/sign-up?type="FREELANCER"')}>Freelancer account</MenuItem>
          </Popover>
        </CustomForm>
      </Box>
    </FormBox>
  );
}
