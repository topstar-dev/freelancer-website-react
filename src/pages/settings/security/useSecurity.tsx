import React from 'react';
import axios from 'axios';
import { useSnackbar } from "notistack";
import { baseURL } from '../../../redux/apiCall';

export default function useSecurity() {
    const { enqueueSnackbar } = useSnackbar();

    const headers = {
        "Accept-Language": 'en',
        "device-type": 'WEB'
    }
    axios.defaults.withCredentials = true;

    const getCurrency = () => {
        axios.get(`${baseURL}/user/v1/settings/security`, {
            headers: headers
        }).then((res) => {
            // setCurrency(res.data);
            enqueueSnackbar(res.data.message, { variant: 'success' });
        })
            .catch((error) => {
                enqueueSnackbar(error.response.data.message, { variant: 'error' });
            });
    }

    React.useEffect(() => {
        getCurrency()
    });
    //  return { currency };
}