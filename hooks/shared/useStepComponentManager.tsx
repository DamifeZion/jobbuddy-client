import { StoreRootState } from "@/services/store";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

export const useStepComponentManager = (components: React.ReactNode[]) => {
   const { currentStep, steps } = useSelector(
      (state: StoreRootState) => state.multiStepSlice
   );

   const renderCurrentStepComponent  = useCallback(() => {
      const stepIndex = steps && steps.indexOf(currentStep);
      if (stepIndex !== -1 && stepIndex && stepIndex < components.length) {
         return components[stepIndex];
      }
      // Return the first component as default
      return components[0];
   }, [currentStep, steps, components]);

   useEffect(() => {
      renderCurrentStepComponent();
   }, [renderCurrentStepComponent ]);

   return {
      renderCurrentStepComponent,
   };
};
