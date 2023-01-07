import React, { ReactNode } from "react";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch } from "../../../redux/hooks";
import { resetPasswordUser } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";
import Button from "../../../components/button/Button";
import WithTranslateFormErrors from "../../../services/validationScemaOnLangChange";
import Form from "../../../components/form/Form";
import Card from "../../../components/card/Card";
import { Formik } from "formik";
import * as yup from "yup";
import '../auth.css';
import { useNavigate } from "../../../routes/Router";

export default function SetNewPassword(mainProps: any) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [backdrop, setBackdrop] = React.useState(false);
  const resetPasswordData = sessionStorage.getItem('reset-password-data') ? JSON.parse(`${sessionStorage.getItem('reset-password-data')}`) : {};
  const [formData] = React.useState({
    password: resetPasswordData.password || '',
    confirm_password: resetPasswordData.confirm_password || ''
  });

  React.useEffect(() => {
    document.title = t('title.reset-password');
  })

  return (
    <Card className={`auth-card`}>
      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={yup.object({
          password: yup
            .string()
            .required(t('validation.set-password-required')),
          confirm_password: yup
            .string()
            .required(t('validation.confirm-password-required'))
            .min(8, t('validation.password-length'))
            .when("password", {
              is: (value: string) => (value && value.length > 0 ? true : false),
              then: yup.string().oneOf([yup.ref("password")], t('validation.passwords-not-match')),
            })
        })}
        onSubmit={() => { }}
      >
        {formik => (
          <WithTranslateFormErrors {...formik}>
            <Form>
              <img
                src="/images/rounx-symbol.png"
                alt="Rounx admin"
                width="60px"
                height="60px"
                className='primary-color'
                style={{ alignSelf: "center" }}
              />
              <Typography className="account-title-info">
                {t('password-title')}
              </Typography>
              <TextField
                fullWidth
                id="password"
                name="password"
                label={t('set-password')}
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={(formik.touched.password && Boolean(formik.errors.password) ? formik.errors.password : t('at_least_8_characters')) as ReactNode}
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
              <TextField
                fullWidth
                id="confirm_password"
                name="confirm_password"
                type={showPassword ? "text" : "password"}
                label={t('confirm-password')}
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                helperText={(formik.touched.confirm_password && formik.errors.confirm_password) as ReactNode}
              />
              <Box style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button onClick={() => {
                  formik.validateForm().then((res: any) => {
                    const { password, confirm_password } = res;
                    if (password) {
                      formik.setFieldTouched('password', true, true);
                      formik.setFieldError('password', password);
                    }

                    if (confirm_password) {
                      formik.setFieldTouched('confirm_password', true, true);
                      formik.setFieldError('confirm_password', confirm_password);
                    }

                    if (!(confirm_password || password)) {
                      const resetPasswordObj = {
                        email: resetPasswordData.email,
                        code: resetPasswordData.code,
                        password: formik.values.password
                      }
                      setBackdrop(true);
                      dispatch(resetPasswordUser(resetPasswordObj)).then((res: any) => {
                        const { payload } = res;
                        const { message, success } = payload;
                        enqueueSnackbar(message);
                        if (success) {
                          dispatch(resetDefault());
                          sessionStorage.removeItem('reset-password-data')
                          navigate(`/sign-in`);
                        }
                        setBackdrop(false);
                      }).catch((err) => {
                        setBackdrop(false);
                        enqueueSnackbar("Error occured");
                      })
                    }
                  })
                }}>
                  {t('submit')}
                </Button>
              </Box>
            </Form>
          </WithTranslateFormErrors>
        )}
      </Formik>
      <Backdrop
        sx={{ color: '#fff', zIndex: 999 }}
        open={backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Card>
  );
}
