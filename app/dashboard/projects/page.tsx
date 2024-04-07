"use client";
import { BiPlus } from "react-icons/bi";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routeConstants } from "@/constants/route-const";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { navbarConstants } from "@/constants/navbar-const";
import { useMediaQuery } from "@mui/material";
import { screenConstants } from "@/constants/screen-const";

import FilterAndView from "@/components/projects/filter-and-view-mode/filter-and-view";
import ProjectList from "@/components/projects/project-layout/project-list";

const Projects = () => {
   const dispatch = useDispatch();
   const mobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.Mobile_Screen_PX})`
   );
   const { authRoute } = routeConstants;

   return (
      <DashboardLayout pageTitle="Projects">
         <div className="flex items-center justify-between">
            <h1 className="hidden text-3xl font-bold lg:block">Projects</h1>

            <Link href={authRoute.nestedRoute.newProject}>
               <Button
                  size={mobileScreen ? "icon" : "default"}
                  style={{
                     bottom: `calc(${navbarConstants.Mobile_Navbar_Height} + 40px)`,
                  }}
                  className="max-lg:h-11 max-lg:w-11 max-lg:rounded-full  gap-1 fixed z-50 right-5 lg:static lg:bottom-auto lg:z-0"
               >
                  <BiPlus className="w-3/4 h-3/4 lg:w-full lg:h-full" />
                  <span className="hidden lg:block">Add New</span>
               </Button>
            </Link>
         </div>

         {/* Filter Section Begins */}
         <div>
            <FilterAndView />
         </div>
         {/* Filter Section Ends */}

         {/* Below is all Projects */}
         <div className="mt-10">
            <ProjectList />
         </div>
      </DashboardLayout>
   );
};

export default Projects;
