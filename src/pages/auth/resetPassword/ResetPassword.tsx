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
import WithTranslateFormErrors from '../../../services/validationScemaOnLangChange';
import { Backdrop, CircularProgress } from '@mui/material';

export default function ResetPassword() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [formData, setFormData] = React.useState({
		email: "",
		code: '',
		password: '',
		confirm_password: ''
	});
	const [activeStep, setActiveStep] = React.useState<number>(0);
	const [backdrop, setBackdrop] = React.useState(false);

	React.useEffect(() => {
		document.title = t('title.reset-password')
		window.onpopstate = e => {
			e.preventDefault();
			if (activeStep > 0) {
				handleBack();
			}
		};
	})

	const handleNext = (values: any, formik: any) => {
		const newActiveStep = activeStep + 1;
		setActiveStep(newActiveStep);
		formik.resetForm();
		setFormData(values);
		navigate(`/reset-password`, { state: values })
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const steps: any = {
		0: (props: any) => <EnterEmail formik={props} handleNext={handleNext} setBackdrop={setBackdrop} />,
		1: (props: any) => <VerifyCode formik={props} handleBack={handleBack} handleNext={handleNext} setBackdrop={setBackdrop} />,
		2: (props: any) => <SetNewPassword formik={props} handleBack={handleBack} setBackdrop={setBackdrop} />
	}

	return (
		<Card className={`rounx-auth-card`}>
			<Formik
				enableReinitialize
				initialValues={formData}
				validationSchema={yup.object({
					email: yup
						.string()
						.email(t('validation.email-valid'))
						.required(t('validation.email-required')),
					code: yup.number()
						.required(t('validation.code-required')),
					password: yup
						.string()
						.required(t('validation.set-password-required')),
					confirm_password: yup
						.string()
						.required(t('validation.confirm-password-required'))
						.min(8, t('validation.password-length'))
						.when("password", {
							is: (value: string) => (value && value.length > 0 ? true : false),
							then: yup.string().oneOf([yup.ref("password")], t('validation.two-passwords-do-not-match')),
						})
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
			<Backdrop
				sx={{ color: '#fff', zIndex: 999 }}
				open={backdrop}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Card>
	);
}
