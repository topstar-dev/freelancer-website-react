import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../redux/store';
import { signIn, signOut } from './authAPI';

interface UserInterface {
    message?: string,
    data: unknown,
    ERROR?: string,
    status: number | null
}

export interface CounterState {
    isLoggedIn: boolean;
    user: UserInterface;
}

export interface loginInterface {
    email: string,
    password: string
}


const initialState: CounterState = {
    isLoggedIn: false,
    user: { data: null, status: null },
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        signInFailed: (state, action) => {
            state.user = action.payload;
        },
        signOutSuccess: (state, action) => {
            state.isLoggedIn = false;
            state.user = action.payload;
        },
        signOutFailed: (state, action) => {
            state.user = action.payload;
        },
        resetUserData: (state) => {
            state.user = { data: null, status: null };
        }
    }
});

export const signInAsync =
    ({ email, password }: loginInterface): AppThunk =>
        async (dispatch, getState) => {
            try {
                const response = await signIn(email, password);
                const user = await response.json();
                if (response.status === 200) {
                    localStorage.setItem("user", JSON.stringify(user.data));
                    dispatch(authSlice.actions.signInSuccess({ status: response.status, ...user }));
                } else {
                    dispatch(authSlice.actions.signInFailed({ status: response.status, ...user }))
                }
            } catch (error) {
                dispatch(authSlice.actions.signInFailed({ status: 500, message: "Error occuered" }))
            }
        };

export const signOutAsync =
    (): AppThunk =>
        async (dispatch, getState) => {
            try {
                const response = await signOut();
                const user = await response.json();
                if (response.status === 200) {
                    localStorage.removeItem("user");
                    dispatch(authSlice.actions.signOutSuccess({ status: response.status, ...user }));
                } else {
                    dispatch(authSlice.actions.signOutFailed({ status: response.status, ...user }))
                }
            } catch (error) {
                dispatch(authSlice.actions.signOutFailed({ status: 500, message: "Error occuered" }))
            }
        };

export const { resetUserData } = authSlice.actions;

export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const user = (state: RootState) => state.auth.user;

export default authSlice.reducer;