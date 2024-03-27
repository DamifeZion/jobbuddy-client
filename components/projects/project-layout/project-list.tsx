import { StoreRootState } from "@/services/store"
import { useSelector } from "react-redux"
import GridCard from "../project-card/grid-card";
import ListCard from "../project-card/list-card";
import LoadingProject from "../project-card/loading-card";
import { useProjectLayout } from "@/hooks/project/useProjectLayout";


const ProjectList = () => {
   useProjectLayout() //this hook checks and sets the Layout/View Mode in the local storage

   const { viewMode } = useSelector((state: StoreRootState) => state.projectSlice);
   let isLoading;

   if (isLoading) {
      return <LoadingProject />
   }

   if (viewMode === "grid") {
      return <GridCard />
   }

   return <ListCard />
}


export default ProjectList