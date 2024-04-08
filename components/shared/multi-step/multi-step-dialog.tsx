"use client";
import { BsChevronLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import React from "react";
import { DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import {
   MultiStepDialogHeaderProps,
   MultiStepDialogContentProps,
} from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { prevStep } from "@/services/slices/multi-step-slice/multi-step-slice";

const variants = {
   hidden: { opacity: 0, x: 50, transition: { duration: 0.5 } },
   visible: { opacity: 1, x: 50, transition: { duration: 0.5 } },
};

export const MulstiStepDialogHeader = ({
   defaultStep,
   className,
   hidePreviousButton = false,
   onPrevClick,
   children,
   ...props
}: MultiStepDialogHeaderProps) => {
   const { currentStep } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );
   const dispatch = useDispatch();

   return (
      <AnimatePresence mode="wait">
         <motion.div
            key={currentStep}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
         >
            <DialogHeader
               className={cn("flex items-center gap-4 line-clamp-1", className)}
               {...props}
            >
               {currentStep !== defaultStep && hidePreviousButton && (
                  <Button
                     variant="ghost"
                     size="icon"
                     onClick={() => {
                        dispatch(prevStep());
                        onPrevClick;
                     }}
                  >
                     <BsChevronLeft />
                  </Button>
               )}

               {children}
            </DialogHeader>
         </motion.div>
      </AnimatePresence>
   );
};

export const MultiStepDialogContent = ({
   children,
   ...props
}: MultiStepDialogContentProps) => {
   const { currentStep } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

   return (
      <AnimatePresence mode="wait">
         <motion.div
            key={currentStep}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
         >
            <DialogContent {...props}>{children}</DialogContent>
         </motion.div>
      </AnimatePresence>
   );
};
