/**NOTE:
 * This slice is responsible for managing the navigation of multi-step processes in the application.
 * It can be used to conditionally render different contents in various UI elements like Dialogs, Modals, Drawers, etc.
 *
 * The slice contains two main pieces of state:
 * 1. `steps`: An array that holds the sequence of steps in the current multi-step process. Each step is represented by a string.
 * 2. `currentStep`: A string that represents the current step in the multi-step process.
 *
 * The slice provides three actions:
 * 1. `setSteps`: This action is used to set the `steps` state. It accepts either a string or an array of strings. If a string is provided, the action will add the string to the `steps` array only if it doesn't already exist in the array. If an array of strings is provided, the action will replace the current `steps` array with the provided array.
 *
 * 2. `setCurrentStep`: This action is used to set the `currentStep` state. It accepts a string and sets the `currentStep` to the provided string only if it exists in the `steps` array.
 *
 * 3. `resetAllSteps`: This action resets both the `steps` and `currentStep` states to their initial values.
 */

import { MultistepSlice } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: MultistepSlice = {
   steps: [],
   currentStep: "",
};

export const multiStepSlice = createSlice({
   name: "Milti-Step Slice",

   initialState,

   reducers: {
      setSteps: (state, action: PayloadAction<string | string[]>) => {
         if (action.payload) {
            if (Array.isArray(action.payload)) {
               state.steps = action.payload;
            } else if (!state.steps.includes(action.payload)) {
               state.steps.push(action.payload);
            }
         }
      },

      setCurrentStep: (state, action) => {
         if (state.steps.includes(action.payload)) {
            state.currentStep = action.payload;
         }
      },

      prevStep: (state) => {
         const { currentStep, steps } = state;

         const currentIndex = steps.indexOf(currentStep);

         // get the previous step
         if (currentIndex > 0) {
            const prevStep = steps[currentIndex - 1];

            state.currentStep = prevStep;
         }
      },

      nextStep: (state) => {
         const { currentStep, steps } = state;

         // check if it's not the last step
         const currentIndex = steps.indexOf(currentStep);

         if (currentIndex < steps.length - 1) {
            const nextStep = steps[currentIndex + 1];

            state.currentStep = nextStep;
         }
      },

      resetAllSteps: () => {
         return { ...initialState };
      },
   },
});

export const { setSteps, setCurrentStep, prevStep, nextStep, resetAllSteps } =
   multiStepSlice.actions;
