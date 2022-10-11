import React from "react";
import {
    TextField,
    Typography,
    Box
} from "@mui/material";
import { BlueButton, DecideButton, CustomForm } from "../../commonStyle";
import { useNavigate } from "react-router-dom";
import useEmail from "./customHooks/useEmail";

export default function Email(props: any) {
    const navigate = useNavigate();
    const { formik } = useEmail(props.handleNext);
    return (
        <CustomForm onSubmit={formik.handleSubmit}>
            <img
                src="images/rounx-symbol.png"
                alt="Rounx admin"
                width="60px"
                height="60px"
                style={{ color: "#336def", alignSelf: "center" }}
            />
            <Typography
                style={{
                    fontSize: "170px",
                    textAlign: "center",
                }}
            >
                Reset Password
            </Typography>
            <Typography
                style={{
                    fontSize: "16px",
                    textAlign: "center",
                    marginBottom: '20px',
                    alignSelf: "center"
                }}>Enter your email address and we will send you a verification code.</Typography>
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
            <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end' }}>
                <DecideButton
                    onClick={() => props.handleBack()}
                    sx={{ marginRight: '10px' }}>
                    Back
                </DecideButton>
                <BlueButton style={{ float: "right" }} type="submit">
                    Next
                </BlueButton>
            </Box>
        </CustomForm>

    );
}
