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
import Button from "../../../components/button/Button";

export default function Password(mainProps: any) {
    const { t } = useTranslation();
    const { formik } = mainProps;

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <Typography className="rounx-account-title-info">
                {t('signup-password-title')}
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
                type={showPassword ? "text" : "password"}
                label={t('confirm-password')}
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
            />
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                        if (!(password || confirm_password)) {
                            mainProps.handleNext(formik);
                        }
                    })
                }} >
                    {t('next')}
                </Button>
            </Box>
        </>
    );
}
