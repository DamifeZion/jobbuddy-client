import { routeConstants } from "@/constants/route-const";
import { setSelectedProjects } from "@/services/slices/dashboard/project-slice/projectSlice";
import { StoreRootState } from "@/services/store";
import { ProjectCardProp } from "@/types";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export const useHandleProjectCardClick = (project: ProjectCardProp) => {
   const router = useRouter();
   const dispatch = useDispatch();
   const { selectedProjects } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const hasSelectedProjects = selectedProjects.length > 0;
   const { editProject: editProjectRoute } =
      routeConstants.authRoute.nestedRoute;

   const handleCardClick = () => {
      //NOTE: If there is any project selected, then we toggle the checkbox on click else we route.
      if (hasSelectedProjects) {
         return dispatch(setSelectedProjects(project.id));
      }

      return router.push(editProjectRoute.replace(":id", project.id));
   };

   return {
      handleCardClick,
   };
};
