import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
} from "@/components/ui/select";
import { screenConstants } from "@/constants/screen-const";
import { StoreRootState } from "@/services/store";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FileTextIcon, ImageIcon } from "@radix-ui/react-icons";
import { setDownloadFormat } from "@/services/slices/dashboard/project-slice/projectSlice";
import { projectConstants } from "@/constants/project-const";
import { ProjectSliceProp } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useDynamicHeight } from "@/hooks/shared/useDynamicHeight";
import {
   SelectDrawer,
   SelectDrawerContent,
   SelectDrawerItem,
   SelectDrawerTrigger,
} from "@/components/shared/select-drawer";

const DownloadStep = () => {
   const dispatch = useDispatch();
   const { downloadFormat } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const { activeProject } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );
   const { downloadFormatSelect } = projectConstants;
   const { Mobile_Screen_PX } = screenConstants;
   const { ref: scrollRef, height: scrollHeight } = useDynamicHeight("300px");
   const mobileScreen = useMediaQuery(`(max-width: ${Mobile_Screen_PX})`);

   //NOTE: Responsible for dynamically rendering icons
   const renderIcon = (fileType: ProjectSliceProp["downloadFormat"]) => {
      switch (fileType) {
         case "JPG":
         case "PNG":
            return <ImageIcon className="size-6" />;

         default:
            return <FileTextIcon className="size-6" />;
      }
   };

   const handleDownloadProject = () => {
      alert(
         "Make a post request and download the project with the project id: " +
            activeProject.id
      );
   };

   // === MOBILE SCREEN ===//
   if (mobileScreen) {
      return (
         <div className="mx-6 px-0 mt-2 !py-0">
            <Label
               htmlFor="file-type"
               className="mb-2 font-semibold text-[13px]"
            >
               File type
            </Label>

            <SelectDrawer>
               <SelectDrawerTrigger id="file-type">
                  {renderIcon(downloadFormat)} {downloadFormat}
               </SelectDrawerTrigger>

               <SelectDrawerContent className="px-0">
                  <ScrollArea className="h-[60dvh]">
                     {downloadFormatSelect.map((data, index) => (
                        <SelectDrawerItem
                           key={index}
                           defaultValue={downloadFormat}
                           value={data.type}
                           onValueChange={(value) =>
                              dispatch(setDownloadFormat(value))
                           }
                           className="py-8"
                        >
                           <div className="flex-grow grid grid-cols-[25px_1fr] text-start items-center gap-3">
                              {renderIcon(
                                 data.type as ProjectSliceProp["downloadFormat"]
                              )}

                              <span className="">
                                 <p>{data.type}</p>
                                 <p className="text-muted-foreground">
                                    {data.desc}
                                 </p>
                              </span>
                           </div>
                        </SelectDrawerItem>
                     ))}
                  </ScrollArea>
               </SelectDrawerContent>
            </SelectDrawer>

            <Button
               onClick={handleDownloadProject}
               className="w-full mt-4 mb-2"
            >
               Download
            </Button>
         </div>
      );
   }

   //=== LARGE SCREEN ===//
   return (
      <div className="px-4">
         <Label htmlFor="file-type" className="font-semibold text-[13px]">
            File type
         </Label>

         <Select
            defaultValue={downloadFormat}
            onValueChange={(value) => dispatch(setDownloadFormat(value))}
         >
            <SelectTrigger
               id="file-type"
               className="h-10 mt-2 px-3 gap-3 justify-start tracking-wider"
            >
               {renderIcon(downloadFormat)} {downloadFormat}
            </SelectTrigger>

            <SelectContent>
               <ScrollArea ref={scrollRef} style={{ height: scrollHeight }}>
                  {downloadFormatSelect.map((data, index) => (
                     <SelectItem key={index} value={data.type} className="px-3">
                        <div className="flex-grow grid grid-cols-[25px_1fr] items-center gap-3">
                           {renderIcon(
                              data.type as ProjectSliceProp["downloadFormat"]
                           )}

                           <span>
                              {data.type} <br />
                              {data.desc}
                           </span>
                        </div>
                     </SelectItem>
                  ))}
               </ScrollArea>
            </SelectContent>
         </Select>

         <Button onClick={handleDownloadProject} className="w-full mt-4 mb-2">
            Download
         </Button>
      </div>
   );
};

export default DownloadStep;
