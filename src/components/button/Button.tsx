import { Button as MuiButton } from '@mui/material';
import './button.css';

export default function Button({ children, className, variant = 'contained', ...rest }: any) {
    return (
        <MuiButton
            style={{ width: 'auto' }}
            variant={variant}
            className={`button ${className}`}
            {...rest}
        >
            {children}
        </MuiButton>
    )
}