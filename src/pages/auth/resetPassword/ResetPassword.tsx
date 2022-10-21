import * as React from 'react';
import * as yup from "yup";
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import EnterEmail from './enterEmail';
import VerifyCode from './verifyCode';
import SetNewPassword from './setNewPassword';
import { CustomForm } from "../../commonStyle";
import Card from '../../../components/card/Card';
import '../auth.css';
import { useTranslation } from 'react-i18next';

const validationSchema = yup.object({
	email: yup
		.string()
		.email("Enter a valid email")
		.required("Email is required"),
	code: yup.number()
		.required("Code is required"),
	password: yup
		.string()
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
	confirm_password: yup
		.string()
		.when("password", {
			is: (value: string) => (value && value.length > 0 ? true : false),
			then: yup.string().oneOf([yup.ref("password")], "Passwords do not match"),
		})
		.required("This field is required")
});

export default function ResetPassword() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [activeStep, setActiveStep] = React.useState<number>(0);

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
				validationSchema={validationSchema}
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
