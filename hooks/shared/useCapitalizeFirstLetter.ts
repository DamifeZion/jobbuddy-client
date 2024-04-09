import { useEffect, useState } from "react";

// The purpose of this hook is to capitalize the first letter of every word separated by space.
//Just like CSS text-transform: capitalize.
export const useCapitalizeFirstLetter = (value?: string) => {
   const [capitalizedValue, setcapitalizedValue] = useState<string | undefined>(
      value
   );

   useEffect(() => {
      if (!value) return;

      const capitalized = value
         .split(" ")
         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
         .join(" ");

      setcapitalizedValue(capitalized);
   }, [value]);

   return capitalizedValue;
};
