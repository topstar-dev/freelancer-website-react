import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import accountSlice from './account/accountSlice';
import authReducer from './auth/authSlice';
import freelancerSlice from './freelancer/freelancerSlice';
import homeReducer from './home/homeSlice';
import jobFeedbackSlice from './jobFeedback/jobFeedbackSlice';
import occupationSkillsSlice from './occupationSkills/occupationSkillsSlice';
import otherSlice from './other/otherSlice';
import profileSlice from './profile/profileSlice';
import resourcesSlice from './resources/resourcesSlice';
import settingsSlice from './settings/settingsSlice';
import starSlice from './star/starSlice';

export const store = configureStore({
  reducer: {
    account: accountSlice,
    auth: authReducer,
    freelancer: freelancerSlice,
    home: homeReducer,
    jobFeedback: jobFeedbackSlice,
    occupationSkills: occupationSkillsSlice,
    other: otherSlice,
    profile: profileSlice,
    resources: resourcesSlice,
    settings: settingsSlice,
    star: starSlice
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
