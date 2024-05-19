import { StoreRootState } from "@/services/redux-provider/store";
import { useSelector } from "react-redux";
import GridLayout from "./grid-layout";
import ListLayout from "./list-layout";
import LoadingProject from "../project-card/card/loading-card";
import { projectConstants } from "@/constants/project-const";

const ProjectList = () => {
   const { projectItem: projectData } = projectConstants;

   const { viewMode } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );

   let isLoading;

   if (isLoading) {
      return <LoadingProject />;
   }

   if (viewMode === "grid") {
      return <GridLayout projectData={projectData} />;
   }

   return <ListLayout projectData={projectData} />;
};

export default ProjectList;
