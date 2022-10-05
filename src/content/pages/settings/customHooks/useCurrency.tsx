import React from 'react';
import axios from 'axios';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function useCurrency() {
	const navigate = useNavigate();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const [currency, setCurrency] = React.useState([]);
	const headers = {
		"Content-Type": "application/json",
		"Accept-Language": 'en',
		"device-type": 'WEB'
	}
	const getCurrency = () => {
		axios.get(`${BASE_URL}/settings/currency`, {
			headers: headers
		}).then((res) => {
			setCurrency(res.data);
			enqueueSnackbar(res.data.message, { variant: 'success' });
		})
			.catch((error) => {
				enqueueSnackbar(error.response.data.message, { variant: 'error' });
			});
	}
	React.useEffect(() => {
		getCurrency()
	}, []);
	return { currency };
}