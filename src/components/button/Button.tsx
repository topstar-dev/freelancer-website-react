import * as React from 'react';
import { Button as MuiButton } from '@mui/material';
import './button.css';

export default function Button({ children, className, variant = 'contained', ...rest }: any) {
    return (
        <MuiButton
            variant={variant}
            className={`rounx-blue-button ${className}`}
            {...rest}
        >
            {children}
        </MuiButton>
    )
}