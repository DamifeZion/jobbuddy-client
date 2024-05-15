import { useEffect, useState } from "react";
import axios from "axios";

// API key for the Country State City API
const apiKey = process.env.NEXT_PUBLIC_COUNTRY_STATE_CITY_API_KEY;

// Type for the raw data returned from the API
type APIResponseData = {
   id: string;
   name: string;
   iso2?: string;
   iso3?: string;
   phonecode?: string;
};

// Type for the transformed data used in the application
type TransformedData = {
   label: string;
   value: string;
   iso2?: string;
};

export const useCountryStateCityData = (
   selectedCountryName: string,
   selectedStateName: string
) => {
   const [countryData, setCountryData] = useState<TransformedData[]>([]);
   const [stateData, setStateData] = useState<TransformedData[]>([]);
   const [cityData, setCityData] = useState<TransformedData[]>([]);

   // NOTE: Fetches the list of countries when the component mounts
   useEffect(() => {
      axios
         .get(`https://api.countrystatecity.in/v1/countries`, {
            headers: { "X-CSCAPI-KEY": apiKey },
         })
         .then((res) => {
            const transformedData = res.data.map(
               (country: APIResponseData): TransformedData => {
                  return {
                     label: country.name,
                     value: country.name.toLowerCase(),
                     iso2: country.iso2,
                  };
               }
            );

            setCountryData(transformedData);
         });
   }, []);

   // NOTE: Fetches the list of states for the selected country. ===> DO NOT ADD ANY DEPENDENCIES EXCEPT 'selectedCountryName' ELSE ERROR <===
   useEffect(() => {
      if (selectedCountryName) {
         const matchedCountry = countryData.find(
            (country) => country.value === selectedCountryName
         );

         axios
            .get(
               `https://api.countrystatecity.in/v1/countries/${matchedCountry?.iso2}/states`,
               {
                  headers: { "X-CSCAPI-KEY": apiKey },
               }
            )
            .then((res) => {
               const transformedData = res.data.map(
                  (state: APIResponseData): TransformedData => {
                     return {
                        label: state.name,
                        value: state.name.toLowerCase(),
                        iso2: state.iso2,
                     };
                  }
               );
               setStateData(transformedData);
            });
      }
   }, [selectedCountryName]);

   // NOTE: Fetches the list of cities for the selected state. ===> DO NOT ADD ANY DEPENDENCIES EXCEPT 'selectedStateName' ELSE ERROR <===
   useEffect(() => {
      if (selectedStateName) {
         const matchedCountry = countryData.find(
            (country) => country.value === selectedCountryName
         );

         const matchedState = stateData.find(
            (state) => state.value === selectedStateName
         );

         axios
            .get(
               `https://api.countrystatecity.in/v1/countries/${matchedCountry?.iso2}/states/${matchedState?.iso2}/cities`,
               {
                  headers: { "X-CSCAPI-KEY": apiKey },
               }
            )
            .then((res) => {
               const transformedData = res.data.map(
                  (city: APIResponseData): TransformedData => {
                     return {
                        label: city.name,
                        value: city.name.toLowerCase(),
                     };
                  }
               );

               setCityData(transformedData);
            });
      }
   }, [selectedStateName]);

   return {
      countryData,
      stateData,
      cityData,
   };
};
