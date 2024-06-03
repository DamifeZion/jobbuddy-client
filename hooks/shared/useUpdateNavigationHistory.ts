import { StoreRootState } from "@/services/redux-provider/store";
import { useDispatch, useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { setNavigationHistory } from "@/services/slices/route-slice/route-slice";

export const useUpdateNavigationHistory = () => {
   const dispatch = useDispatch();
   const { navigationHistory } = useSelector(
      (state: StoreRootState) => state.routeSlice
   );
   const pathname = usePathname();

   useLayoutEffect(() => {
      // Check if the current path is the same as the last item in the navigationHistory
      if (navigationHistory[navigationHistory.length - 1] !== pathname) {
         // If they are not the same, update the navigationHistory with the new path
         dispatch(setNavigationHistory([...navigationHistory, pathname]));
      }
   }, [dispatch, pathname, navigationHistory]);
};
