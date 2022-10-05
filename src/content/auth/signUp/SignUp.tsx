import * as React from 'react';
import Box from '@mui/material/Box';
import { CustomForm, FormBox } from '../../commonStyle/CommonStyle';
import Email from './Email';
import Code from './Code';
import Password from './Password';
import Info from './Info';

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
        <FormBox >
            <Box width='500px'>
                {steps[activeStep]}
            </Box>
        </FormBox >

    );
}
