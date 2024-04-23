import GridCard from "@/components/projects/project-card/card/grid-card";
import ProjectBulkAction from "../../project-card/options/project-bulk-action";
import { ProjectCardProp } from "@/types";

const GridLayout = ({ projectData }: { projectData: ProjectCardProp[] }) => {
   return (
      <div>
         <div className="grid gap-4 grid-cols-2 600:gap-5 min-[650px]:grid-cols-3 800:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 5xl:grid-cols-12">
            {projectData.map((project, index) => {
               return <GridCard key={index} project={project} />;
            })}
         </div>

         {/*NOTE: For the mark all,delete marked items, e.t.c */}
         <ProjectBulkAction project={projectData} />
      </div>
   );
};

export default GridLayout;
