import * as React from 'react';
import Box from '@mui/material/Box';
import { FormBox } from '../../commonStyle';
import EnterEmail from './enterEmail';
import VerifyCode from './verifyCode';
import SetNewPassword from './setNewPassword';
import { useMediaQuery } from 'react-responsive';

export default function ResetPassword() {
	const [activeStep, setActiveStep] = React.useState<number>(1);

	const handleNext = () => {
		const newActiveStep = activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const steps = [
		<EnterEmail handleNext={handleNext} />,
		<VerifyCode handleBack={handleBack} handleNext={handleNext} />,
		<SetNewPassword handleBack={handleBack} />,
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
		</Box >

	);
}
