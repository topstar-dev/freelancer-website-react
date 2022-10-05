import React from "react";
import {
    TextField,
    Typography,
    InputAdornment,
    IconButton,
    Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import usePassword from "./customHooks/usePassword";
import { CustomForm, BlueButton, DecideButton } from "../../commonStyle/CommonStyle";


export default function Password(props: any) {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate = useNavigate();
    const { formik } = usePassword(props.handleNext);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
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
                Create a strong password with a mix of letters, numbers and symbols
            </Typography>
            <TextField
                fullWidth
                id="set_password"
                name="set_password"
                label="Set password"
                type={showPassword ? "text" : "password"}
                value={formik.values.set_password}
                onChange={formik.handleChange}
                helperText={"At least 8 characters"}
                error={formik.touched.set_password && Boolean(formik.errors.set_password)}
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
                    onClick={() => props.handleBack()}
                >
                    Back
                </DecideButton>
                <BlueButton type="submit" >
                    Next
                </BlueButton>
            </Box>
        </CustomForm>
    );
}
