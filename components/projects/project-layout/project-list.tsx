import { StoreRootState } from "@/services/store";
import { useSelector } from "react-redux";
import GridLayout from "./grid/grid-layout";
import ListLayout from "./list-layout";
import LoadingProject from "../project-card/card/loading-card";
import { useGetProjectLayout } from "@/hooks/project/useGetProjectLayout";
import { projectConstants } from "@/constants/project-const";

const ProjectList = () => {
   useGetProjectLayout(); //this hook syncs the Layout/View Mode in the local storage with slice
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
