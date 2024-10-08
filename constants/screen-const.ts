import { navbarConstants } from "./navbar-const";

export const screenConstants = {
   XSM_Mobile_Screen_PX: "360px",
   SM_Mobile_Screen_PX: "640px",
   MD_Mobile_Screen_PX: "768px",
   Mobile_Screen_PX: "1023px",
};

export const visibleViewportHeight = `calc(100dvh - ${navbarConstants.Mobile_Navbar_Height} - 65px)`;
