// Custom hook to update navigation history on route change
import { StoreRootState } from "@/services/redux-provider/store";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { setNavigationHistory } from "@/services/slices/route-slice/route-slice";

export const useUpdateNavigationHistory = () => {
   const dispatch = useDispatch();
   const { navigationHistory } = useSelector(
      (state: StoreRootState) => state.routeSlice
   );
   const pathname = usePathname();
   const initialRender = useRef(true);

   //REFACTOR: Once user authentication is handled, when a user logs out or session ends, remove this from the storage.
   useLayoutEffect(() => {
      const storedHistory = localStorage.getItem(
         String(process.env.NEXT_PUBLIC_NAVIGATION_HISTORY)
      );

      if (initialRender.current) {
         initialRender.current = false;

         if (storedHistory) {
            // If history exists in local storage, use it
            const history = JSON.parse(storedHistory) as string[];

            // Set the history without pushing if the last item does not match the current pathname
            if (history[history.length - 1] !== pathname) {
               history.push(pathname);
               dispatch(setNavigationHistory(history));
            } else {
               // Set the history without pushing if the last item matches the current pathname
               dispatch(setNavigationHistory(history));
            }
         } else {
            // Initialize with the current pathname
            dispatch(setNavigationHistory([pathname]));
         }
      }
   }, [dispatch, pathname]);
};
