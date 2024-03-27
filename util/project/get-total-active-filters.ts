export const getTotalActiveFilters = (
   category: string,
   dateModified: string,
   sortBy: string
) => {
   let count = 0;

   if (category !== "all categories") {
      count++;
   }

   if (dateModified !== "anytime") {
      count++;
   }

   if (sortBy !== "newest edited") {
      count++;
   }

   return count;
};
