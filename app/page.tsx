"use client";
import { useDocumentTitle } from "@/hooks/shared/useDocumentTitle";
import { StoreRootState } from "@/services/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// I beleive you know what this is. The default page. So when we have a user we use a custome hook to auto redirect to the dashboard. You know!!!
export default function Home() {
   useDocumentTitle("Home");

   return (
      <div className="Landing ">
         <h1>
            There is no homepage. For authorised page head to
            <Link href="/dashboard">
               <Button variant={"default"} className="ml-2">
                  Dashboard
               </Button>
            </Link>
         </h1>
      </div>
   );
}
