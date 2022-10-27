import React, { useEffect } from "react";
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  Typography,
  FormControl,
  Box,
  InputAdornment,
  IconButton,
  Popover,
  MenuItem
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { CustomForm } from "../../commonStyle";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  signInUser
} from '../../../redux/auth/authActions';
import { resetDefault } from "../../../redux/auth/authSlice";
import Button from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import '../auth.css';
import WithTranslateFormErrors from "../../../i18n/validationScemaOnLangChange";

export default function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, userInfo, success, message } = useAppSelector((state) => state.auth)
  const [showPassword, setShowPassword] = React.useState(false);
  const [type, setType] = React.useState<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    document.title = t('title.signin')
  })

  useEffect(() => {
    if (message) {
      dispatch(resetDefault())
      enqueueSnackbar(message);
    }
    if (success && userInfo) {
      navigate('/');
    }
  }, [enqueueSnackbar, navigate, dispatch, userInfo, success, message])

  return (
    <Card className="rounx-auth-card">
      <Formik
        initialValues={
          {
            email: "",
            password: "",
          }
        }
        validationSchema={yup.object({
          email: yup
            .string()
            .required(t('validation.email-required')),
          password: yup
            .string()
            .required(t('validation.password-required')),
        })}
        onSubmit={(values, actions) => {
          dispatch(signInUser({ email: values.email, password: values.password }));
        }}
      >
        {props => (
          <WithTranslateFormErrors {...props}>
            <CustomForm onSubmit={props.handleSubmit}>
              <img
                src="images/rounx-symbol.png"
                alt="Rounx admin"
                width="60px"
                height="60px"
                style={{ alignSelf: "center", cursor: "pointer" }}
                onClick={() => navigate('/')}
              />
              <Typography className="rounx-account-title-info">
                {t('signin-title')}
              </Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                type="text"
                label={t('email')}
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
                  autoComplete="false"
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
              <Box style={{ marginTop: "10px" }}>
                <Button
                  className="normal-text round-button"
                  variant="outlined"
                  style={{ borderRadius: 20 }}
                  onClick={() => navigate("/reset-password")}
                >
                  {t('signin-forgot-password')}
                </Button>
                <Button
                  disabled={loading}
                  type="submit"
                  style={{ float: "right" }}
                >
                  {t('signin')}
                </Button>
              </Box>
              <Button
                className="normal-text round-button"
                variant="outlined"
                style={{ width: 'fit-content', borderRadius: 20 }}
                onClick={(e: any) => setType(e.currentTarget)}>
                {t('create-account')}
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
                <MenuItem onClick={() => navigate('/sign-up?type=CLIENT')}>{t('client-account')}</MenuItem>
                <MenuItem onClick={() => navigate('/sign-up?type=FREELANCER')}>{t('freelancer-account')}</MenuItem>
              </Popover>
            </CustomForm>
          </WithTranslateFormErrors>
        )}
      </Formik>
    </Card>
  );
}
