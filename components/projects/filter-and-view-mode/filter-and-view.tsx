import {
   setCategory,
   setDateModified,
   setSortBy,
   clearFilters,
} from "@/services/slices/dashboard/project-slice/projectSlice";
import { Button } from "@/components/ui/button";
import { FilterSelect } from "./filter-select";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/services/redux-provider/store";
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
} from "@/components/shared/my-carousel";
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
            className="w-full pl-px mt-4 relative sm:w-auto"
         >
            <MyCarouselPrevious className="size-11 -left-4 " />

            <CarouselContent className="flex items-center pl-0.5 py-4 sm:py-2">
               <CarouselItem className="basis-auto sm:hidden">
                  <ViewControl />
               </CarouselItem>

               <CarouselItem className="basis-auto relative">
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
                        className="px-0.5 mr-4 font-semibold"
                     >
                        Clear all ({totalActiveFilters})
                     </Button>
                  )}
               </CarouselItem>
            </CarouselContent>

            <MyCarouselNext className="size-11 -right-4" />

            <div
               id="view"
               className="absolute top-1/2 -translate-y-1/2 -right-11 max-sm:hidden"
            >
               <ViewControl />
            </div>
         </Carousel>
      </div>
   );
};

export default FilterAndView;
