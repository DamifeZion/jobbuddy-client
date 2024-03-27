import { screenConstants } from "@/constants/screen-const";
import {
   setCategory,
   setDateModified,
   setSortBy,
   clearFilters,
} from "@/services/slices/project-slice/projectSlice";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "./filter-select";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/store";
import { projectConstants } from "@/constants/project-const";
import { getTotalActiveFilters } from "../../../util/project/get-total-active-filters";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from "@/components/ui/carousel";
import {
   MyCarouselNext,
   MyCarouselPrevious,
} from "@/components/shared/my-carousel/my-carousel";
import ViewControl from "./view-control";

const FilterAndView = () => {
   const dispatch = useDispatch();
   const { category, dateModified, sortBy } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const totalActiveFilters = getTotalActiveFilters(
      category,
      dateModified,
      sortBy
   );
   const { filterOptions } = projectConstants;

   return (
      <div className="flex sm:flex-row sm:items-center">
         <Carousel
            orientation="horizontal"
            opts={{ align: "start" }}
            className="w-full pl-px sm:w-auto"
         >
            <MyCarouselPrevious className="-left-4" />

            <CarouselContent className="flex items-center pl-0.5 py-1.5">
               <CarouselItem className="basis-auto sm:hidden">
                  <ViewControl />
               </CarouselItem>

               <CarouselItem className="basis-auto">
                  <FilterSelect
                     label="category"
                     defaultValue={category}
                     selectItem={filterOptions.categoryOptions}
                     onValueChange={(value) => dispatch(setCategory(value))}
                  />
               </CarouselItem>

               <CarouselItem className="basis-auto">
                  <FilterSelect
                     label="date modified"
                     defaultValue={dateModified}
                     selectItem={filterOptions.dateModifiedOptions}
                     onValueChange={(value) => dispatch(setDateModified(value))}
                  />
               </CarouselItem>

               <CarouselItem className="basis-auto">
                  <FilterSelect
                     label="sort by"
                     defaultValue={sortBy}
                     selectItem={filterOptions.sortByOptions}
                     onValueChange={(value) => dispatch(setSortBy(value))}
                  />
               </CarouselItem>

               <CarouselItem className="w-fit basis-auto">
                  {totalActiveFilters !== 0 && (
                     <Button
                        variant="link"
                        onClick={() => dispatch(clearFilters())}
                        className="px-0.5 font-semibold"
                     >
                        Clear all ({totalActiveFilters})
                     </Button>
                  )}
               </CarouselItem>
            </CarouselContent>

            <MyCarouselNext className="-right-4" />
         </Carousel>

         <div id="view" className="ml-2 max-sm:hidden">
            <ViewControl />
         </div>
      </div>
   );
};

export default FilterAndView;
