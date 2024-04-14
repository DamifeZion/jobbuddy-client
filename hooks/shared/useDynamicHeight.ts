import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const useDynamicHeight = (customMaxHeight = "100vh") => {
   const { ref, entry } = useInView({
      threshold: 0,
   });

   const [height, setHeight] = useState("auto");

   useEffect(() => {
      if (entry && entry.rootBounds) {
         // Calculate the available space in the viewport, leaving a 20px gap
         const viewportHeight =
            window.innerHeight || document.documentElement.clientHeight;
         let dynamicHeight = Math.min(
            viewportHeight - entry.boundingClientRect.top - 20,
            entry.boundingClientRect.bottom - 20
         );

         // If customMaxHeight is true, set the height to the customMaxHeight
         if (customMaxHeight) {
            dynamicHeight = Math.min(dynamicHeight, parseInt(customMaxHeight));
         }

         // Ensure dynamicHeight is a positive number before setting the height
         if (dynamicHeight > 0) {
            setHeight(`${dynamicHeight}px`);
         }
      }
   }, [entry, customMaxHeight]);

   return { ref, height };
};
