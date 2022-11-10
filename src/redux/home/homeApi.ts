import { apiCall } from "../apiCall";

export const appointmentSchedule = (email: string) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ email })
    };
    return apiCall(`/appointment-email`, requestOptions);
};
