import { toggleViewMode } from "@/services/slices/project-slice/projectSlice";
import { StoreRootState } from "@/services/store";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

export const useGetProjectLayout = () => {
   const dispatch = useDispatch();
   const { viewMode } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );

   //Use useRef to track the initial render;
   const initialRender = useRef(true);

   useEffect(() => {
      //This will only run once, and its on initial render
      //That is the very first time the page loads
      if (initialRender.current) {
         initialRender.current = false;

         const storedLayout = localStorage.getItem(
            String(process.env.NEXT_PUBLIC_PROJECT_VIEW_MODE)
         );
         
         if (storedLayout && storedLayout !== viewMode) {
            const layout = JSON.parse(storedLayout);

            dispatch(toggleViewMode(layout));
         }
      }
   }, [dispatch, viewMode]);
};
