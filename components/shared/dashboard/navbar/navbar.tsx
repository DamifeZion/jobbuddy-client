import { useMediaQuery } from "@mui/material";
import Sidebar from "./desktop/sidebar/sidebar";
import MobileNavbar from "./mobile/top-navbar";

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
