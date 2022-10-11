import * as React from 'react';
import Box from '@mui/material/Box';
import Email from './Email';
import Code from './Code';
import Password from './Password';
import Info from './Info';
import { useMediaQuery } from 'react-responsive';

export default function SignUp() {
    const [activeStep, setActiveStep] = React.useState<number>(0);

    const handleNext = () => {
        const newActiveStep = activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const steps = [
        <Info handleNext={handleNext} />,
        <Password handleBack={handleBack} handleNext={handleNext} />,
        <Email handleBack={handleBack} handleNext={handleNext} />,
        <Code handleBack={handleBack} />,
    ];
    return (
        <Box style={{
            position: 'relative',
            height: '100%'
        }}>
            <Box style={{
                width: useMediaQuery({ query: '(max-width: 500px)' }) ? 'calc(100% - 20px)' : '500px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1
            }}>
                {steps[activeStep]}
            </Box>
        </Box>
    );
}
