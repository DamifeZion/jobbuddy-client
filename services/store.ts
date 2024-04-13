import { configureStore } from "@reduxjs/toolkit";

// Api Middlewares
import { authApi } from "./api/authApi/authApi";
import { newsletterApi } from "./api/newsletterApi/newsletterApi";
import { settingsApi } from "./api/dashboard/settingsApi/settingsApi";
import { userSlice } from "./slices/dashboard/user-slice/userSlice";
import { navbarSlice } from "./slices/dashboard/navbar-slice/navbarSlice";
import { projectSlice } from "./slices/dashboard/project-slice/projectSlice";
import { routeSlice } from "./slices/route-slice/route-slice";
import { multiStepSlice } from "./slices/multi-step-slice/multi-step-slice";
import { selectDrawerSlice } from "./slices/custom-ui-slice/select-drawer-slice";
import { loadingSlice } from "./slices/loading-slice/loadingSlice";
import { renameFileApi } from "./api/dashboard/projects/rename-file-api";
import { dashboardMainContentSlice } from "./slices/dashboard/dashboard-main-content-slice/dashboard-main-content-slice";

export const store = configureStore({
   reducer: {
      // For States
      userSlice: userSlice.reducer,
      navbarSlice: navbarSlice.reducer,
      projectSlice: projectSlice.reducer,
      routeSlice: routeSlice.reducer,
      multiStepSlice: multiStepSlice.reducer,
      selectDrawerSlice: selectDrawerSlice.reducer,
      loadingSlice: loadingSlice.reducer,
      dashboardMainContentSlice: dashboardMainContentSlice.reducer,

      // Api reducer
      [authApi.reducerPath]: authApi.reducer,
      [newsletterApi.reducerPath]: newsletterApi.reducer,
      [settingsApi.reducerPath]: settingsApi.reducer,
      [renameFileApi.reducerPath]: renameFileApi.reducer,
   },

   // For API  Query
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
         authApi.middleware,
         newsletterApi.middleware,
         settingsApi.middleware,
         renameFileApi.middleware,
      ]),
});

export type StoreRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
