"use client";
import { BiPlus } from "react-icons/bi";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routeConstants } from "@/constants/route-const";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/redux-provider/store";
import { navbarConstants } from "@/constants/navbar-const";
import { useMediaQuery } from "@mui/material";
import { screenConstants } from "@/constants/screen-const";

import FilterAndView from "@/components/projects/filter-and-view-mode/filter-and-view";
import ProjectList from "@/components/projects/project-layout/project-list";
import ProjectBulkAction from "@/components/projects/project-card/options/project-bulk-action";
import { cn } from "@/lib/utils";

const Projects = () => {
   const dispatch = useDispatch();
   const mobileScreen = useMediaQuery(
      `(max-width: ${screenConstants.Mobile_Screen_PX})`
   );
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
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
                     bottom: `calc(${navbarConstants.Mobile_Navbar_Height} + 75px)`,
                  }}
                  className={cn(
                     "max-lg:size-9 max-lg:rounded-full gap-1 fixed z-10 right-6 lg:static lg:bottom-auto lg:z-0",
                     {
                        "opacity-0 invisible ease-linear duration-100":
                           selectedProjects.length > 0,
                     }
                  )}
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
         <div className="mt-10 lg:mb-10">
            <ProjectList />
         </div>
      </DashboardLayout>
   );
};

export default Projects;
