export const disableBodyScrolling = (open: boolean) => {
   if (open) {
      document.body.style.overflow = "hidden";
   } else {
      document.body.style.overflow = "auto";
   }
};
