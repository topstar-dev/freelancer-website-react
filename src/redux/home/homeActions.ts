import { createAsyncThunk } from "@reduxjs/toolkit";
import { appointmentSchedule } from "./homeApi";

export const scheduleAppointment = createAsyncThunk(
    'home/scheduleAppointment',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await appointmentSchedule(email);
            return response.success ? response : rejectWithValue(response);
        } catch (error: any) {
            return rejectWithValue({ message: "Error occured" })
        }

    }
)