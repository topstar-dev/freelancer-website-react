import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BlueButton, DecideButton, FormBox } from '../../commonStyle/CommonStyle';
import { Divider, Paper } from '@mui/material'
import Skills from './Skills';
import NameAndPhotos from './NameAndPhotos';
import Experience from './Experience';
import Education from './Education';
import Language from './Language';
import AboutMe from './AboutMe';
import Finished from './Finished';
const steps = [
    <Skills />,
    <NameAndPhotos />,
    <Experience />,
    <Education />,
    <Language />,
    <AboutMe />
];
const names = ['Skills', 'Name and Photos', 'Experience', 'Education', 'Language', 'About me'];

export default function Submit() {
    const [activeStep, setActiveStep] = React.useState(0);

    const totalSteps = () => {
        return steps.length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };
    const completed = () => {
        return activeStep === totalSteps();
    }
    const handleNext = () => {
        const newActiveStep = activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };



    return (
        <FormBox>
            <Box>
                <Typography marginBottom='20px' fontSize='24px'>
                    Submit freelancer application
                </Typography>
                {completed() ? <Finished /> :
                    <Paper sx={{ width: '450px' }}>

                        {steps[activeStep]}
                        <Box p={3} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'baseline', pt: 2 }}>
                            <DecideButton
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 2 }}
                            >
                                Back
                            </DecideButton>
                            {isLastStep() ? <BlueButton onClick={handleNext} >
                                Submit
                            </BlueButton> : <BlueButton onClick={handleNext} >
                                Next
                            </BlueButton>}
                        </Box>
                    </Paper>
                }

            </Box>
        </FormBox>

    );
}
