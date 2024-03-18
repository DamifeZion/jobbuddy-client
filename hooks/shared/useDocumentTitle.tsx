import { useEffect } from "react";

// This will simply let you change the document title for each page
export const useDocumentTitle = (title: string, prefixTitle?: boolean) => {
   useEffect(() => {
      let baseTitle = "Job Buddy";
      let defaultPrefix = prefixTitle !== undefined ? prefixTitle : true;

      if (title || title !== "") {
         if (defaultPrefix) {
            baseTitle += ` | ${title}`;
         } else {
            baseTitle = title;
         }
      }

      document.title = baseTitle;
   }, [title, prefixTitle]);
};
