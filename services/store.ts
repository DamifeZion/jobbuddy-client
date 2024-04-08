import { configureStore } from "@reduxjs/toolkit";

// Api Middlewares
import { authApi } from "./api/authApi/authApi";
import { newsletterApi } from "./api/newsletterApi/newsletterApi";
import { settingsApi } from "./api/settingsApi/settingsApi";
import { userSlice } from "./slices/user-slice/userSlice";
import { navbarSlice } from "./slices/navbar-slice/navbarSlice";
import { projectSlice } from "./slices/project-slice/projectSlice";
import { routeSlice } from "./slices/route-slice/route-slice";
import { multiStepSlice } from "./slices/multi-step-slice/multi-step-slice";

export const store = configureStore({
   reducer: {
      // For States
      userSlice: userSlice.reducer,
      navbarSlice: navbarSlice.reducer,
      projectSlice: projectSlice.reducer,
      routeSlice: routeSlice.reducer,
      multiStepSlice: multiStepSlice.reducer,

      // Api reducer
      [authApi.reducerPath]: authApi.reducer,
      [newsletterApi.reducerPath]: newsletterApi.reducer,
      [settingsApi.reducerPath]: settingsApi.reducer,
   },

   // For API  Query
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
         authApi.middleware,
         newsletterApi.middleware,
         settingsApi.middleware,
      ]),
});

export type StoreRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
