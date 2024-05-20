"use client";
import { Provider } from "react-redux";
import { store } from "./store";

// NOTE: Redux Persist
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";


const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
   let persistor = persistStore(store);

   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            {children}
         </PersistGate>
      </Provider>
   );
};

export default ReduxProvider;
