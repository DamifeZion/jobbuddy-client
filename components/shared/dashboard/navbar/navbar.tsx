import { useMediaQuery } from "@mui/material";
import Sidebar from "./sidebar/sidebar";
import MobileNavbar from "./mobile-navbar";

const Navbar = () => {
   const mobileScreen = useMediaQuery("(max-width: 1023px)");

   return (
      <>
         {mobileScreen && <MobileNavbar />}

         {/* For Laptops  */}
         {!mobileScreen && <Sidebar />}
      </>
   );
};

export default Navbar;
