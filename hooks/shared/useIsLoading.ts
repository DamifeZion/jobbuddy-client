import { setIsLoading } from "@/services/slices/loading-slice/loading-slice";
import { StoreRootState } from "@/services/redux-provider/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//NOTE: This will mostly be used in forms, and where you want to disable componet like dialogs e.t.c if anything loads
export const useIsLoading = (isLoading?: boolean) => {
   const dispatch = useDispatch();
   const { isLoading: globalLoading } = useSelector(
      (state: StoreRootState) => state.loadingSlice
   );
   const [isOpen, setIsOpen] = useState<boolean>(false);

   useEffect(() => {
      dispatch(setIsLoading(isLoading));
   }, [dispatch, isLoading]);

   const handleOpenChange = () => {
      //NOTE: If there is a loading anywhere, we want to FORCE OPEN.
      if (globalLoading) {
         setIsOpen(true);
      } else {
         setIsOpen((prev) => !prev);
      }
   };

   const closeModal = () => {
      setIsOpen(false);
   };

   const openModal = () => {
      setIsOpen(true);
   };

   return {
      isOpen,
      handleOpenChange,
      closeModal,
      openModal,
   };
};
