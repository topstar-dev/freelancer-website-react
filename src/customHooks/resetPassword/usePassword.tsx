import axios from 'axios';
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as yup from "yup";
import { useSnackbar } from "notistack";

const validationSchema = yup.object({
	set_password: yup
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
export default function usePassword() {
	const [data, setData] = useSearchParams();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const BASE_URL = process.env.REACT_APP_BASE_URL;
	const navigate = useNavigate();
	const formik = useFormik({
		initialValues: {
			confirm_password: "",
			set_password: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			axios.post(`${BASE_URL}/reset-password`, {
				code: `${data.get('code')}`,
				email: `${data.get('email')}`,
				password: values.set_password,
			}, {
				headers: {
					"Content-Type": "application/json",
					"Accept-Language": 'en'
				}
			}).then((res) => {
				enqueueSnackbar(res.data.message, { variant: 'success' });
				navigate("/sign-in")
			})
				.catch((error) => {
					enqueueSnackbar(error.response.data.message, { variant: 'error' });
				});
		},
	});
	return { formik };
}