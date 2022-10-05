import React from 'react'
import {
    Box,
    Typography,
    Paper
} from "@mui/material"
import { BlueButton } from '../../commonStyle/CommonStyle';
import { useNavigate } from 'react-router-dom';

export default function Finished() {
    const navigate = useNavigate();
    console.log('finished');

    return (
        <Paper sx={{ width: '450px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2, px: 5 }} >
                <Typography fontSize='24px'>Applicaion submitted</Typography>
                <br />
                <Typography fontSize='14px' color="#757575" >Thank you for taking the time to fill out the application form, we will get back to you within 1–3 working days. If approved, you will be able to start work immediately.</Typography>
                <br />
                <BlueButton onClick={() => navigate('/')}>Completed</BlueButton>
            </Box >
        </Paper>

    )
}