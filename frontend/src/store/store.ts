import { combineReducers, configureStore } from "@reduxjs/toolkit";

// Assuming you have separate reducer files for each slice
import applicationReducer from "./slice/applicationSlice";
import jobReducer from "./slice/jobSlice";
import recruiterReducer from "./slice/recruiterSlice";
import candidateReducer from "./slice/candidateSlice";
import adminReducer from "./slice/adminSlice";
import userReducer from "./slice/userSlice";
import { useDispatch } from "react-redux";

// Combine reducers
const rootReducer = combineReducers({
  application: applicationReducer,
  jobs: jobReducer,
  recruiter: recruiterReducer,
  candidate: candidateReducer,
  user: userReducer,
  admin: adminReducer,
});

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // Enable Redux DevTools only in development
  devTools: import.meta.env.VITE_API_NODE_ENV !== "production",
});

// Export types for TypeScript or for better type inference
export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
