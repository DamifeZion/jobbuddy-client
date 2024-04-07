import ListCard from "../project-card/list-card";
import { projectConstants } from "@/constants/project-const";


const ListLayout = () => {
   const { projectItem } = projectConstants;

   return (
      <div>
         <div className="grid grod-cols-1">
            {projectItem.map((data, index) => {
               
               return (
                  <ListCard 
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

export default ListLayout;
