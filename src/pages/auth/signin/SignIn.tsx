import React, { useEffect } from "react";
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
import { useMediaQuery } from "react-responsive";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { BlueButton, CustomForm } from "../../commonStyle";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  isLoggedIn,
  user,
  signInAsync
} from '../authSlice';

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export default function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const alreadyLoggedIn = useAppSelector(isLoggedIn);
  const userData = useAppSelector(user);
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);
  const [type, setType] = React.useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    console.log(userData)
    if (alreadyLoggedIn && userData.status === 200) {
      enqueueSnackbar(userData.message, { variant: 'success' });
      navigate('/');
    } else {
      if (userData.message) {
        enqueueSnackbar(userData.message, { variant: 'error' });
      }
    }
  }, [alreadyLoggedIn])

  return (
    <Box style={{
      position: 'relative',
      height: '100%'
    }}>
      <Box style={{
        width: useMediaQuery({ query: '(max-width: 500px)' }) ? 'calc(100% - 20px)' : '500px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1
      }}>
        <Formik
          initialValues={
            {
              email: "",
              password: "",
            }
          }
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            dispatch(signInAsync({ email: values.email, password: values.password }))
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
                <span>{t('signin-logo')} </span>
                <span style={{ fontWeight: "bold" }}>Rounx </span>
              </Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                label={t('signin-email')}
                value={props.values.email}
                onChange={props.handleChange}
                error={props.touched.email && Boolean(props.errors.email)}
                helperText={props.touched.email && props.errors.email}
              />
              <FormControl>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label={t('signin-password')}
                  type={showPassword ? "text" : "password"}
                  value={props.values.password}
                  onChange={props.handleChange}
                  helperText={props.touched.password && props.errors.password}
                  error={props.touched.password && Boolean(props.errors.password)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
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
                  {t('signin-forgot-password')}
                </Button>
                <BlueButton type="submit" style={{ float: "right" }}>
                  {t('signin-submit')}
                </BlueButton>
              </Box>
              <Button
                className="normal-text round-button"
                variant="outlined"
                style={{ width: 'fit-content' }}
                onClick={(e) => setType(e.currentTarget)}>
                {t('signin-signup')}
              </Button>
              <Popover
                open={Boolean(type)}
                anchorEl={type}
                onClose={() => setType(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <MenuItem onClick={() => navigate('/sign-up?type="CLIENT"')}>{t('signin-signup-client')}</MenuItem>
                <MenuItem onClick={() => navigate('/sign-up?type="FREELANCER"')}>{t('signin-signup-freelancer')}</MenuItem>
              </Popover>
            </CustomForm>
          )}
        </Formik>
      </Box>
    </Box >
  );
}
