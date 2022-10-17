import { configureStore } from '@reduxjs/toolkit';
import { StarWarsAPI } from './API.Service';


export const store = configureStore({
  reducer: {
    [StarWarsAPI.reducerPath]: StarWarsAPI.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(StarWarsAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;