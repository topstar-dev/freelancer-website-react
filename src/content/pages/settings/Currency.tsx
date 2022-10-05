import React from "react";
import { Paper, TextField, Typography, Box } from "@mui/material";
import { BlueButton } from "../../commonStyle/CommonStyle";
import useCurrency from "./customHooks/useCurrency";
export default function Currency() {
    const { currency } = useCurrency();
    console.log(currency);
    return (
        <Paper sx={{ padding: 3, pr: '20%', mt: 8 }}>
            <Typography fontSize='20px'>
                Select currency
            </Typography>
            <br />
            <TextField fullWidth label={currency[0]}></TextField>
        </Paper>
    )
}