import React from "react";
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
                Create a strong password with a mix of letters, numbers and symbols
            </Typography>
            <TextField
                fullWidth
                id="password"
                name="password"
                label="Set password"
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
                label="Confirm password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
                helperText={formik.touched.confirm_password && formik.errors.confirm_password}
            />
            <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <DecideButton
                    sx={{ mr: 2 }}
                    onClick={() => mainProps.handleBack()}
                >
                    Back
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
                    Next
                </BlueButton>
            </Box>
        </CustomForm>
    );
}
