import useMediaQuery from "@mui/material/useMediaQuery";
import { screenConstants } from "@/constants/screen-const";

const { XSM_Mobile_Screen_PX } = screenConstants;

export const useResponsiveAlignSide = (breakpoint = XSM_Mobile_Screen_PX) => {
   const matches = useMediaQuery(`(max-width: ${breakpoint})`);

   const getAlignment = () => {
      return matches ? "center" : "start";
   };

   const getSide = () => {
      return matches ? "bottom" : "right";
   };

   return { getAlignment, getSide };
};
