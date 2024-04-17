export const isActiveMenu = (pathname: string, href: string) => {
   const pathnameParams = pathname.split('/')
   
   if (pathnameParams.length <= 1) {
      return pathname === href;
   }

   const newPathname = [...pathnameParams.splice(0, 1)];
   return newPathname.includes(href);
};
