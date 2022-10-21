import * as React from 'react';
import { Box } from '@mui/material';
import './card.css'

export default function Card({ children, className, ...rest }: any) {
    return (
        <Box className={`rounx-card ${className}`} {...rest}>
            {children}
        </Box>
    )
}