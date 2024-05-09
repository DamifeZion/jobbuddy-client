"use client";
import { useParams } from "next/navigation";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout";

const ProjectId = () => {
   const { id } = useParams();
   const projectTitle = "Full stack developer c.v";

   return (
      <DashboardLayout pageTitle={projectTitle} hidePageTitle={true}>
         <div>
            <h1>
               This is project for project <b>({id})</b>
            </h1>

            <h2>
               Here you will ensure to make a get request with the users data,
               and allow for them to edit the values here
            </h2>
         </div>
      </DashboardLayout>
   );
};

export default ProjectId;
