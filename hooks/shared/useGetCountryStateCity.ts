import { useEffect, useState } from "react";
import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_COUNTRY_STATE_CITY_API_KEY;

type ResponseData = {
   id: string;
   name: string;
   iso2: string;
   iso3: string;
   phonecode: string;
};

type TransformedData = {
   label: string;
   value: string;
   iso2: string;
};

export const useGetCountryStateCity = (
   selectedCountry: string,
   selectedState: string
) => {
   const [countries, setCountries] = useState<TransformedData[]>([]);
   const [states, setStates] = useState<TransformedData[]>([]);
   const [cities, setCities] = useState<TransformedData[]>([]);

   console.log(countries);

   useEffect(() => {
      axios
         .get(`https://api.countrystatecity.in/v1/countries`, {
            headers: { "X-CSCAPI-KEY": apiKey },
         })
         .then((res) => {
            const data = res.data.map(
               (country: ResponseData): TransformedData => {
                  return {
                     label: country.name,
                     value: country.name.toLowerCase(),
                     iso2: country.iso2,
                  };
               }
            );

            setCountries(data);
         });
   }, []);

   useEffect(() => {
      if (selectedCountry) {
         axios
            .get(
               `https://api.countrystatecity.in/v1/states/${selectedCountry}`,
               {
                  headers: { "X-CSCAPI-KEY": apiKey },
               }
            )
            .then((res) => {
               setStates(res.data);
            });
      }
   }, [selectedCountry]);

   useEffect(() => {
      if (selectedState) {
         axios
            .get(`https://api.countrystatecity.in/v1/cities/${selectedState}`, {
               headers: { "X-CSCAPI-KEY": apiKey },
            })
            .then((res) => {
               setCities(res.data);
            });
      }
   }, [selectedState]);

   return {
      countries,
      states,
      cities,
   };
};
