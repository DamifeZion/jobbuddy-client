import { routeConstants } from "@/constants/route-const";

export const isActiveMenu = (pathname: string, href: string) => {
   const { main: dashboardHome } = routeConstants.authRoute;

   if (pathname === dashboardHome) {
      return pathname === href;
   } else {
      const pathnameParts = pathname.split("/");
      const hrefParts = href.split("/");

      //NOTE: The first part is empty string, the second is dashboardHome and the third is the actual route. Therefore the array index will be 2.
      return pathnameParts[2] === hrefParts[2];
   }

   // return pathname === href || pathname.startsWith(`${href}/`);
};
