import React from "react";

import { CustomForm, FormBox, BlueButton, DecideButton } from "../../commonStyle";
import {
    TextField,
    Typography,
    Box,
} from "@mui/material";
import useCode from "./customHooks/useCode";


export default function Code(props: any) {
    const { formik, email } = useCode();
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
                    fontSize: "17px",
                    textAlign: "center",
                }}
            >
                Reset Password
            </Typography>
            <Typography style={{ alignSelf: 'center', fontSize: '20px' }}>An email with a verification code was just to</Typography>
            <Typography style={{ alignSelf: 'center', fontWeight: 'bold' }}>{email}</Typography>
            <TextField
                fullWidth
                id="code"
                name="code"
                label="Enter code"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
            />
            <Box style={{ margin: "10px 0px", display: 'flex', justifyContent: 'flex-end' }}>
                <DecideButton
                    onClick={() => props.handleBack()}
                    sx={{ marginRight: '10px' }}        >
                    Back
                </DecideButton>
                <BlueButton style={{ float: "right" }} type="submit">
                    Next
                </BlueButton>
            </Box>
        </CustomForm>
    );
}
