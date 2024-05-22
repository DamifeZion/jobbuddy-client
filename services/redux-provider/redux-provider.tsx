"use client";

import { navbarConstants } from "@/constants/navbar-const";
import dynamic from "next/dynamic";
const DynamicImage = dynamic(() => import("next/image"), { ssr: false });
import { useTheme } from "next-themes";

import { Provider } from "react-redux";
import { store } from "./store";

// NOTE: Redux Persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const Loading = () => {
   const { resolvedTheme } = useTheme();

   return (
      <div className="bg-background w-screen h-screen flex flex-wrap items-center justify-center gap-1">
         <DynamicImage
            src={
               resolvedTheme === "dark"
                  ? navbarConstants.logo.dark
                  : navbarConstants.logo.light
            }
            alt=""
            width={200}
            height={200}
            priority
            className="animate-pulse"
         />
      </div>
   );
};

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
   let persistor = persistStore(store);

   return (
      <Provider store={store}>
         <PersistGate loading={<Loading />} persistor={persistor}>
            {children}
         </PersistGate>
      </Provider>
   );
};

export default ReduxProvider;
