import { createSlice } from '@reduxjs/toolkit';
import { signInUser, signOutUser } from './authActions';

// initialize userToken from local storage
var userToken = null;
try {
    if (localStorage.getItem('userToken')) {
        userToken = JSON.parse(`${localStorage.getItem('userToken')}`);
    }
} catch (err) {
    userToken = null;
}

export interface UserInterface {
    avatar_url: string | null;
    email: string;
    language: string
    name: string
    user_type: string
}

export interface AuthState {
    message?: string,
    loading: boolean;
    userInfo: UserInterface | null;
    error: string | null,
    status?: number
}

const initialState: AuthState = {
    loading: false,
    userInfo: userToken, // for user object
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //signin
        builder.addCase(signInUser.pending, (state: AuthState, _action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(signInUser.fulfilled, (state: AuthState, action) => {
            state.loading = false
            state.status = action.payload.status;
            state.userInfo = action.payload.data;
            state.message = action.payload.message;
            localStorage.setItem('userToken', JSON.stringify(action.payload.data))
        })
        builder.addCase(signInUser.rejected, (state: AuthState, action) => {
            state.loading = false
            state.error = action.payload as string
        })

        //signout
        builder.addCase(signOutUser.pending, (state: AuthState, _action) => {
            state.loading = true
            state.error = null
        })
        builder.addCase(signOutUser.fulfilled, (state: AuthState, action) => {
            state.loading = false
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.userInfo = null;
            localStorage.removeItem('userToken')
        })
        builder.addCase(signOutUser.rejected, (state: AuthState, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
});

export default authSlice.reducer;