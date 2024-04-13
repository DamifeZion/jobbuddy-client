import { setMainContentWidth } from "@/services/slices/dashboard/dashboard-main-content-slice/dashboard-main-content-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const useSyncMainContentWidth = (width: number) => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setMainContentWidth(width + 48 + "px"));
   }, [width, dispatch]);
};
