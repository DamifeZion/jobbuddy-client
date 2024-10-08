import { configureStore } from "@reduxjs/toolkit";

// NOTE: Redux Persist;
import { createPersistStorage } from "./redux-persist-storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

//NOTE: Api Middlewares
import { authApi } from "../api/authApi/authApi";
import { newsletterApi } from "../api/newsletterApi/newsletterApi";
import { settingsApi } from "../api/dashboard/settingsApi/settingsApi";
import { userSlice } from "../slices/dashboard/user-slice/userSlice";
import { navbarSlice } from "../slices/dashboard/navbar-slice/navbarSlice";
import { projectSlice } from "../slices/dashboard/project-slice/projectSlice";
import { routeSlice } from "../slices/route-slice/route-slice";
import { multiStepSlice } from "../slices/multi-step-slice/multi-step-slice";
import { selectDrawerSlice } from "../slices/custom-ui-slice/select-drawer-slice";
import { loadingSlice } from "../slices/loading-slice/loading-slice";
import { renameFileApi } from "../api/dashboard/projects/rename-file-api";
import { dashboardMainContentSlice } from "../slices/dashboard/dashboard-main-content-slice/dashboard-main-content-slice";
import { clipboardSlice } from "../slices/clipboard-slice/clipboard-slice";
import { newsletterSlice } from "../slices/newsletter/newsletter";
import { unAuthNavbarSlice } from "../slices/unauth-navbar-slice/unauth-navbar-slice";
import { careerSlice } from "../slices/dashboard/career-profile-slice/career-profile-slice";

const persistConfiguration = {
   key: "root",
   version: 1,
   storage: createPersistStorage(),
};

// NOTE: Enter reducers to persist to local storage.
const reducer = combineReducers({
   // For States
   userSlice: userSlice.reducer,
   unAuthNavbarSlice: unAuthNavbarSlice.reducer,
   navbarSlice: navbarSlice.reducer,
   projectSlice: projectSlice.reducer,
   routeSlice: routeSlice.reducer,
   multiStepSlice: multiStepSlice.reducer,
   selectDrawerSlice: selectDrawerSlice.reducer,
   loadingSlice: loadingSlice.reducer,
   dashboardMainContentSlice: dashboardMainContentSlice.reducer,
   clipboardSlice: clipboardSlice.reducer,
   newsletterSlice: newsletterSlice.reducer,
   careerSlice: careerSlice.reducer,

   // Api reducer
   [authApi.reducerPath]: authApi.reducer,
   [newsletterApi.reducerPath]: newsletterApi.reducer,
   [settingsApi.reducerPath]: settingsApi.reducer,
   [renameFileApi.reducerPath]: renameFileApi.reducer,
});

const persistedReducer = persistReducer(persistConfiguration, reducer);

export const store = configureStore({
   reducer: persistedReducer,

   // For API  Query
   middleware: (getDefaultMiddleware) =>
      // NOTE: Set SerializableCheck to false in getDefaultMiddleware, redux persist will throw error.
      getDefaultMiddleware({ serializableCheck: false }).concat([
         authApi.middleware,
         newsletterApi.middleware,
         settingsApi.middleware,
         renameFileApi.middleware,
      ]),
});

export type StoreRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
