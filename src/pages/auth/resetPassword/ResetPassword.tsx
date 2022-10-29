import * as React from 'react';
import * as yup from "yup";
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import EnterEmail from './enterEmail';
import VerifyCode from './verifyCode';
import SetNewPassword from './setNewPassword';
import { CustomForm } from "../../commonStyle";
import Card from '../../../components/card/Card';
import '../auth.css';
import WithTranslateFormErrors from '../../../i18n/validationScemaOnLangChange';

export default function ResetPassword() {
	const { t } = useTranslation();
	const { state } = useLocation();
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = React.useState<number>(0);

	React.useEffect(() => {
		document.title = t('title.reset-password')
		window.onpopstate = e => {
			e.preventDefault();
			if (activeStep > 0) {
				handleBack();
			}
		};
	})

	const handleNext = (formik: any) => {
		const newActiveStep = activeStep + 1;
		setActiveStep(newActiveStep);
		navigate(`/reset-password`, { state: formik.values })
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
				initialValues={state || { email: "" }}
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
					<WithTranslateFormErrors {...props}>
						<CustomForm>
							<img
								src="images/rounx-symbol.png"
								alt="Rounx admin"
								width="60px"
								height="60px"
								className='primary-color'
								style={{ alignSelf: "center", cursor: "pointer" }}
								onClick={() => navigate('/')}
							/>
							{steps[activeStep](props)}
						</CustomForm>
					</WithTranslateFormErrors>
				)}
			</Formik>
		</Card>
	);
}
