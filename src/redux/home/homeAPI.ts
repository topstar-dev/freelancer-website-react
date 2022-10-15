export const appointmentSchedule = (email: string) => {
    const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'device-type': 'WEB',
            'accept': 'application/json',
            'Accept-Language': 'en'
        },
        body: JSON.stringify({ email })
    };
    return fetch(`/apicall/appointment-email`, requestOptions);
};