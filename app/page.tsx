"use client";
import Link from "next/link";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { routeConstants } from "@/constants/route-const";
import { Button } from "@/components/ui/button";

const Home = () => {
   useDocumentTitle("Home");
   const { main: dashboardRoute } = routeConstants.authRoute;

   return (
      <div className="Landing ">
         <h1>
            There is no homepage. For authorised page head to
            <Link href={dashboardRoute}>
               <Button variant={"default"} className="ml-2">
                  Dashboard
               </Button>
            </Link>
         </h1>
      </div>
   );
};

export default Home;
