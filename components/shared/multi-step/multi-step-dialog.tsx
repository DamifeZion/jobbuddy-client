"use client";
import { BsChevronLeft } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import {
   MultiStepDialogHeaderProps,
   MultiStepDialogContentProps,
   MultiStepDialogProps,
   MultiStepDialogTriggerProps,
} from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
   prevStep,
   resetSteps,
   setCurrentStep,
   setSteps,
} from "@/services/slices/multi-step-slice/multi-step-slice";

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

export const MultiStepDialog = ({
   children,
   ...props
}: MultiStepDialogProps) => {
   //NOTE: When dialog is closed, we want to simply reset the step and reset the current step

   return (
      <Dialog {...props} >
         {children}
      </Dialog>
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

export const MultiStepDialogTrigger = ({children, steps, ...props}: MultiStepDialogTriggerProps) => {
   const dispatch = useDispatch();

   let modalSteps: string | string[];

   //NOTE: Check the type of steps and assign modalSteps accordingly
   if (Array.isArray(steps)) {
      modalSteps = steps;
   } else if (typeof steps === 'object') {
      modalSteps = Object.values(steps);
   } else if (typeof steps === 'string') {
      modalSteps = [steps];
   }

   //NOTE: When the component mounts or when steps change, update the steps in the state
   const handleClick = () => {
      //NOTE: Load all steps into the step slice
      dispatch(setSteps(modalSteps));
       //NOTE: Set the current step to the first item in the array
      dispatch(setCurrentStep(modalSteps[0]));
   };

   return (
      <DialogTrigger
         onClick={handleClick}
         {...props}
      >
         { children }
      </DialogTrigger>
   )
}
