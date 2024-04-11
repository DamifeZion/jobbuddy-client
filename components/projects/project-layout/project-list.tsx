import { StoreRootState } from "@/services/store";
import { useSelector } from "react-redux";
import GridLayout from "./grid-layout";
import ListLayout from "./list-layout";
import LoadingProject from "../project-card/card/loading-card";
import { useGetProjectLayout } from "@/hooks/project/useGetProjectLayout";

const ProjectList = () => {
   useGetProjectLayout(); //this hook checks and sets the Layout/View Mode in the local storage

   const { viewMode } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );

   let isLoading;

   if (isLoading) {
      return <LoadingProject />;
   }

   if (viewMode === "grid") {
      return <GridLayout />;
   }

   return <ListLayout />;
};

export default ProjectList;
