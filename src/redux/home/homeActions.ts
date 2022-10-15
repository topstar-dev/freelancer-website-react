import { createAsyncThunk } from "@reduxjs/toolkit";
import { appointmentSchedule } from "./homeAPI";

export const scheduleAppointment = createAsyncThunk(
    'home/scheduleAppointment',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await appointmentSchedule(email);
            const data = await response.json();
            return { status: response.status, ...data };
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }

    }
)