"use client";

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

//NOTE: To fix the Redux-Persist error "redux-persist failed to create sync storage. falling back to noop storage." We create this function
export const createPersistStorage = (): WebStorage => {
   const isServer = typeof window === "undefined";

   // Returns noop (dummy) storage.
   if (isServer) {
      return {
         getItem() {
            return Promise.resolve(null);
         },
         setItem() {
            return Promise.resolve();
         },
         removeItem() {
            return Promise.resolve();
         },
      };
   }

   return createWebStorage("local");
};