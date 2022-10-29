import { createSlice } from '@reduxjs/toolkit';
import { signInUser, signOutUser } from './authActions';

// initialize userToken from local storage
var userToken = null;
try {
    if (localStorage.getItem('access-token') && localStorage.getItem('refresh-token') && localStorage.getItem('device-token')) {
        userToken = JSON.parse(`${localStorage.getItem('userInfo')}`);
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
    loading: boolean;
    success: boolean,
    message: string | null,
    userInfo: UserInterface | null;
}

const initialState: AuthState = {
    loading: false,
    success: false,
    message: null,
    userInfo: userToken // for user object
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetDefault: (state) => {
            state.success = false;
            state.message = null;
        }
    },
    extraReducers: (builder) => {
        //signin
        builder.addCase(signInUser.pending, (state: AuthState, _action) => {
            state.loading = true;
            state.message = null;
        })
        builder.addCase(signInUser.fulfilled, (state: AuthState, action) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.userInfo = action.payload.data;
            localStorage.setItem('userInfo', JSON.stringify(action.payload.data))
            localStorage.setItem('access-token', action.payload.data.access_token)
            localStorage.setItem('refresh-token', action.payload.data.refresh_token)
            localStorage.setItem('device-token', action.payload.data.device_token)
        })
        builder.addCase(signInUser.rejected, (state: AuthState, action) => {
            const payload = action.payload as AuthState;
            state.success = false;
            state.loading = false;
            state.message = payload.message;
        })

        //signout
        builder.addCase(signOutUser.pending, (state: AuthState, _action) => {
            state.loading = true;
            state.message = null;
        })
        builder.addCase(signOutUser.fulfilled, (state: AuthState, action) => {
            state.loading = false;
            state.success = true;
            state.userInfo = null;
            state.message = action.payload.message;
            localStorage.removeItem('userInfo')
            localStorage.removeItem('access-token')
            localStorage.removeItem('refresh-token')
            localStorage.removeItem('device-token')
        })
        builder.addCase(signOutUser.rejected, (state: AuthState, action) => {
            const payload = action.payload as AuthState;
            state.loading = false;
            state.success = false;
            state.message = payload.message;

        })
    }
});

const { resetDefault } = authSlice.actions;

export { resetDefault }
export default authSlice.reducer;