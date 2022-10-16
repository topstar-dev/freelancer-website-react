import React from "react";
import { useTranslation } from 'react-i18next';
import {
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CustomForm, BlueButton, DecideButton } from "../../commonStyle";

export default function Password(mainProps: any) {
    const { t } = useTranslation();
    const { formik } = mainProps;

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
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
                    fontSize: "16px",
                    textAlign: "center",
                    marginTop: "-10px",
                    marginBottom: "20px",
                }}
            >
                {t('signup-title.password-title')}
            </Typography>
            <TextField
                fullWidth
                id="password"
                name="password"
                label={t('signup-data.set-password')}
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
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
                type="password"
                label={t('signup-data.confirm-password')}
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
            />
            <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'space-between' }}>
                <DecideButton
                    sx={{ mr: 2 }}
                    onClick={() => mainProps.handleBack()}
                >
                    {t('signup-title.back-btn')}
                </DecideButton>
                <BlueButton onClick={() => {
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
                        if (!password && !confirm_password) {
                            mainProps.handleNext();
                        }
                    })
                }} >
                    {t('signup-title.next-btn')}
                </BlueButton>
            </Box>
        </CustomForm>
    );
}
