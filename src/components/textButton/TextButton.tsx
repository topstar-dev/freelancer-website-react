import * as React from 'react';
import { Button } from '@mui/material';
import './textButton.css';

export default function TextButton({ children, className, ...rest }: any) {
    return (
        <Button
            className={`rounx-text-button ${className}`}
            {...rest}
        >
            {children}
        </Button>
    )
}