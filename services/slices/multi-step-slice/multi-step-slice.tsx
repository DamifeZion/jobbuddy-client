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
   stepTitles: [],
   steps: [],
   currentStep: "",
   currentTitle: "",
   disablePrevButton: false,
   disableNextButton: false,
};

export const multiStepSlice = createSlice({
   name: "Milti-Step Slice",

   initialState,

   reducers: {
      setStepTitles: (state, action: PayloadAction<string | string[]>) => {
         if (Array.isArray(action.payload)) {
            state.stepTitles = action.payload;
         } else if (
            Array.isArray(state.stepTitles) &&
            !state.stepTitles.includes(action.payload)
         ) {
            state.stepTitles.push(action.payload);
         } else if (typeof state.stepTitles === "string") {
            state.stepTitles = action.payload;
         }
      },

      setSteps: (state, action: PayloadAction<string | string[]>) => {
         if (Array.isArray(action.payload)) {
            state.steps = action.payload;
         } else if (
            Array.isArray(state.steps) &&
            !state.steps.includes(action.payload)
         ) {
            state.steps.push(action.payload);
         } else if (typeof state.steps === "string") {
            state.steps = action.payload;
         }
      },

      setCurrentStep: (state, action: { payload?: any }) => {
         if (action.payload === undefined) {
            if (Array.isArray(state.steps)) {
               state.currentStep = state.steps[0];

               //NOTE: Update the step title
               state.currentTitle = state.stepTitles[0];
            } else if (typeof state.steps === "string") {
               state.currentStep = state.steps;

               //NOTE: Update the step title
               if (typeof state.stepTitles === "string") {
                  state.currentTitle = state.stepTitles;
               }
            }
         } else {
            if (Array.isArray(state.steps)) {
               if (state.steps.includes(action.payload)) {
                  state.currentStep = action.payload;
               }
            } else if (typeof state.steps === "string") {
               if (state.steps === action.payload) {
                  state.currentStep = action.payload;
               }
            }
         }
      },

      prevStep: (state) => {
         //NOTE: Reset The Next Button First
         state.disableNextButton = false;

         const { currentStep, steps, stepTitles } = state;

         const currentIndex = steps.indexOf(currentStep);

         //NOTE: Get the previous step
         if (currentIndex > 0) {
            const prevStep = steps[currentIndex - 1];

            state.currentStep = prevStep;

            //NOTE: Updtae the title likewise
            const prevTitle = stepTitles[currentIndex + 1];
            if (Array.isArray(state.stepTitles)) {
               state.currentTitle = prevTitle;
            }
         }

         if (currentIndex >= steps.length - 2) {
            state.disablePrevButton = true;
         }
      },

      nextStep: (state) => {
         //NOTE: Reset The Prev Button First
         state.disablePrevButton = false;

         const { currentStep, steps, stepTitles } = state;

         //NOTE: check if it's not the last step
         const currentIndex = steps.indexOf(currentStep);

         if (currentIndex < steps.length - 1) {
            const nextStep = steps[currentIndex + 1];

            state.currentStep = nextStep;

            //NOTE: Updtae the title likewise
            const nextTitle = stepTitles[currentIndex + 1];
            if (Array.isArray(state.stepTitles)) {
               state.currentTitle = nextTitle;
            }
         }

         if (currentIndex >= steps.length - 2) {
            state.disableNextButton = true;
         }
      },

      resetSteps: () => {
         return { ...initialState };
      },
   },
});

export const {
   setSteps,
   setCurrentStep,
   setStepTitles,
   prevStep,
   nextStep,
   resetSteps,
} = multiStepSlice.actions;
