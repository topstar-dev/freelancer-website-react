import * as React from 'react';
import { Button } from '@mui/material';
import './blueButton.css';

export default function BlueButton({ children, className, ...rest }: any) {
    return (
        <Button
            className={`rounx-blue-button ${className}`}
            {...rest}
        >
            {children}
        </Button>
    )
}