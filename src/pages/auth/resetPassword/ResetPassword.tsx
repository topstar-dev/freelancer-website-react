import * as React from 'react';
import * as yup from "yup";
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import EnterEmail from './enterEmail';
import VerifyCode from './verifyCode';
import SetNewPassword from './setNewPassword';
import { CustomForm } from "../../commonStyle";
import Card from '../../../components/card/Card';
import '../auth.css';

export default function ResetPassword() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = React.useState<number>(1);

	React.useEffect(() => {
		document.title = t('title.reset-password')
	})

	const handleNext = () => {
		const newActiveStep = activeStep + 1;
		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const steps: any = {
		0: (props: any) => <EnterEmail formik={props} handleNext={handleNext} />,
		1: (props: any) => <VerifyCode formik={props} handleBack={handleBack} handleNext={handleNext} />,
		2: (props: any) => <SetNewPassword formik={props} handleBack={handleBack} />
	}

	return (
		<Card className="rounx-auth-card">
			<Formik
				initialValues={{ email: "" }}
				validationSchema={yup.object({
					email: yup
						.string()
						.email(t('validation.email-valid'))
						.required(t('validation.email-required')),
					code: yup.number()
						.required(t('validation.code-required')),
					password: yup
						.string()
						.required(t('validation.password-required')),
					confirm_password: yup
						.string()
						.when("password", {
							is: (value: string) => (value && value.length > 0 ? true : false),
							then: yup.string().oneOf([yup.ref("password")], t('validation.confirm-password-not-matched')),
						})
						.required(t('validation.confirm-password-required'))
				})}
				onSubmit={() => { }}
			>
				{props => (
					<CustomForm>
						<img
							src="images/rounx-symbol.png"
							alt="Rounx admin"
							width="60px"
							height="60px"
							style={{ color: "#336def", alignSelf: "center", cursor: "pointer" }}
							onClick={() => navigate('/')}
						/>
						{steps[activeStep](props)}
					</CustomForm>
				)}
			</Formik>
		</Card>
	);
}
