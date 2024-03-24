import { BiPlus } from "react-icons/bi";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routeConstants } from "@/constants/route-const";
import { FilterSelect } from "@/components/projects/filter-select/filter-select";
import { projectConstants } from "@/constants/project-const";

const Projects = () => {
   const { authRoute } = routeConstants;
   const { filterOptions } = projectConstants;

   return (
      <DashboardLayout pageTitle="Projects">
         <div className="flex items-center justify-between">
            <h1 className="hidden text-3xl font-bold lg:block">Projects</h1>

            <Link href={authRoute.nestedRoute.newProject}>
               <Button className="max-lg:rounded-full gap-1">
                  <BiPlus className="w-full h-full" />
                  <span className="hidden lg:block">Add New</span>
               </Button>
            </Link>
         </div>

         <div className="mt-4 grid border">
            <FilterSelect
               label="Category"
               placeholder="Category"
               selectItem={filterOptions.categoryOptions}
            />

            <FilterSelect
               label="Date Modified"
               placeholder="Date Modified"
               selectItem={filterOptions.dateModifiedOptions}
            />

            <FilterSelect
               label="Sort By"
               placeholder="Sort By"
               selectItem={filterOptions.sortByOptions}
            />
         </div>
      </DashboardLayout>
   );
};

export default Projects;
