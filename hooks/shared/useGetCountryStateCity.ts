import { useEffect, useState } from "react";

export const useGetCountryStateCity = () => {
   const [allCountries, setAllCountries] = useState([]);
   const [allStates, setAllStates] = useState([]);
   const [allCities, setAllCities] = useState([]);

   useEffect(() => {}, []);

   return {
      allCountries,
      allStates,
      allCities,
   };
};
