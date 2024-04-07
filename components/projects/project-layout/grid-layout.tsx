import GridCard from "@/components/projects/project-card/grid-card";
import { projectConstants } from "@/constants/project-const";
import { setSelectedProjects } from "@/services/slices/project-slice/projectSlice";


const GridLayout = () => {
   const { projectItem } = projectConstants;

   // Track selected project IDs
   const handleSelectAll = () => {
      //Select all projects as string
      setSelectedProjects(projectItem.map((data) => data.id.toString() ));
   }

   return (
      <div>
         <div className="grid gap-4 grid-cols-2 600:gap-5 min-[650px]:grid-cols-3 800:grid-cols-4 xl:grid-cols-5">
            {projectItem.map((data, index) => {
               
               return (
                  <GridCard 
                     key={index}
                     project={data}
                     totalProjectCount={projectItem.length}
                  />
               )
            })}
         </div>
      </div>
      
   )
};

export default GridLayout;
