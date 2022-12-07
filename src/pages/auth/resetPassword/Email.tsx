import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import {
  TextField,
  Typography,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { useAppDispatch } from "../../../redux/hooks";
import { sendCodeToEmail } from "../../../redux/auth/authActions";
import { resetDefault } from "../../../redux/auth/authSlice";
import Button from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import { Formik } from "formik";
import WithTranslateFormErrors from "../../../services/validationScemaOnLangChange";
import Form from "../../../components/form/Form";
import '../auth.css';
import { useRounxNavigate } from "../../../routes/Router";

export default function EnterEmail(mainProps: any) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useRounxNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [backdrop, setBackdrop] = React.useState(false);

  const resetPasswordData = sessionStorage.getItem('reset-password-data') ? JSON.parse(`${sessionStorage.getItem('reset-password-data')}`) : {};
  const [formData] = React.useState({
    email: resetPasswordData.email || ""
  });

  React.useEffect(() => {
    document.title = t('title.reset-password')
    if (resetPasswordData) {
      const temp = { ...resetPasswordData };
      delete temp['code'];
      delete temp['password'];
      delete temp['confirm_password'];
      sessionStorage.setItem('reset-password-data', JSON.stringify(temp))
    }
  })


  return (
    <Card className={`rounx-auth-card`}>
      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={yup.object({
          email: yup
            .string()
            .email(t('validation.email-valid'))
            .required(t('validation.email-required'))
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
                style={{ alignSelf: "center", cursor: "pointer" }}
                onClick={() => navigate(`/`)}
              />
              <Typography className="rounx-account-title-info">
                <span>{t('reset-password')}</span>
                <br />
                <span style={{ fontSize: '16px' }}>{t('enter_email')}</span>
              </Typography>
              <TextField
                fullWidth
                id="email"
                name="email"
                label={t('email')}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email as ReactNode}
              />
              <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  onClick={() => {
                    formik.validateForm().then((res: any) => {
                      const { email } = res;
                      if (email) {
                        formik.setFieldTouched('email', true, true);
                        formik.setFieldError('email', email);
                      }

                      if (!email) {
                        const sendEmailCodeObj = {
                          email: formik.values.email,
                          function_type: "RESET_PASSWORD"
                        }
                        setBackdrop(true);
                        dispatch(sendCodeToEmail(sendEmailCodeObj)).then((res: any) => {
                          const { payload } = res;
                          const { message, success } = payload;
                          enqueueSnackbar(message);
                          if (success) {
                            dispatch(resetDefault());
                            sessionStorage.setItem('reset-password-data', JSON.stringify({ ...formik.values }))
                            navigate(`/reset-password/code`)
                          }
                          setBackdrop(false);
                        }).catch((err) => {
                          setBackdrop(false);
                          enqueueSnackbar("Error occured");
                        })
                      }
                    })
                  }}>
                  {t('next')}
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
