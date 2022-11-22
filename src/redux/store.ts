import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountSlice from './account/accountSlice';
import authReducer from './auth/authSlice';
import homeReducer from './home/homeSlice';
import otherSlice from './other/otherSlice';
import resourcesSlice from './resources/resourcesSlice';
import settingsSlice from './settings/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountSlice,
    home: homeReducer,
    resources: resourcesSlice,
    other: otherSlice,
    settings: settingsSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
