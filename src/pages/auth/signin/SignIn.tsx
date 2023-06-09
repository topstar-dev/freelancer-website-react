import React, { useEffect } from "react";
import * as yup from "yup";
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  Typography,
  FormControl,
  Box,
  InputAdornment,
  IconButton,
  Popover,
  MenuItem,
  MenuList
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import Form from "../../../components/form/Form";
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import {
  signInUser
} from '../../../redux/auth/authActions';
import { resetDefault } from "../../../redux/auth/authSlice";
import Button from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import WithTranslateFormErrors from "../../../services/validationScemaOnLangChange";
import { useNavigate } from "../../../routes/Router";
import { USER_TYPES } from "../../../redux/constants";
import CustomBackdrop from "../../../components/customBackdrop/CustomBackdrop";
import '../auth.css';

export default function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { loading, userInfo, success, message } = useAppSelector((state) => state.auth)
  const [showPassword, setShowPassword] = React.useState(false);
  const [type, setType] = React.useState<HTMLButtonElement | null>(null);
  const [backdrop, setBackdrop] = React.useState(false);

  useEffect(() => {
    if (userInfo) {
      document.title = t('title.home');
      navigate(`/`);
    } else {
      document.title = t('title.signin')
      sessionStorage.removeItem('signup-info');
      sessionStorage.removeItem('reset-password-data');
    }
  })

  useEffect(() => {
    if (message) {
      dispatch(resetDefault())
      setBackdrop(false);
      enqueueSnackbar(message);
    }
    if (success && userInfo) {
      document.title = t('title.home');
      setBackdrop(false);
      navigate(`/`);
    }
  }, [t, enqueueSnackbar, navigate, dispatch, userInfo, success, message])

  return (
    <Box className='container'>
      <Card className={`auth-card`}>
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
            setBackdrop(true);
            dispatch(signInUser({ email: values.email, password: values.password }));
          }}
        >
          {props => (
            <WithTranslateFormErrors {...props}>
              <Form onSubmit={props.handleSubmit}>
                <img
                  src="/images/rounx-symbol.png"
                  alt="Rounx"
                  width="60px"
                  height="60px"
                  style={{ alignSelf: "center" }}
                />
                <Typography className="account-title-info">
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
                    onClick={() => {
                      navigate(`/reset-password`)
                    }}
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
                  className="sign-in-account-menu"
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
                  <MenuList>
                    <MenuItem onClick={() => {
                      navigate(`/sign-up?type=${USER_TYPES.CLIENT}`)
                    }}>{t('client-account')}</MenuItem>
                    <MenuItem onClick={() => {
                      navigate(`/sign-up?type=${USER_TYPES.FREELANCER}`)
                    }}>{t('freelancer-account')}</MenuItem>
                  </MenuList>
                </Popover>
              </Form>
            </WithTranslateFormErrors>
          )}
        </Formik>
        <CustomBackdrop loading={backdrop} />
      </Card>
    </Box>
  );
}
