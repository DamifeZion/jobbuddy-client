"use client";
import { RiImageEditFill } from "react-icons/ri";
import { StoreRootState } from "@/services/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "@/components/ui/card";
import { useSelector } from "react-redux";
import {
   AlertDialog,
   AlertDialogContent,
   AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Dropzone } from "@/forms/dropzone/dropzone-form";

const Header = () => {
   const { user } = useSelector((state: StoreRootState) => state.userSlice);

   return (
      <Card className="mx-auto pt-20 max-w-screen-1500 w-full overflow-hidden">
         <div className="gradient-primary-1  px-4 h-fit flex items-center justify-center text-center text-balance text-primary-foreground md:px-6">
            <div className="flex flex-col items-center relative -top-10 [&_p]:text-md">
               <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Avatar
                        className="
                           group/avatar size-24 border-[3px] border-primary-foreground cursor-pointer
                           400:size-28
                        "
                     >
                        <span
                           id="edit-image"
                           className="
                              size-full flex items-center justify-center absolute inset-0 rounded-full opacity-0 invisible bg-secondary/50 transition-opacity linear duration-300
                              group-hover/avatar:opacity-100 group-hover/avatar:visible
                           "
                        >
                           <RiImageEditFill className="size-8" />
                        </span>

                        <AvatarImage
                           src={user?.profile}
                           className="w-full h-full object-cover"
                        />
                        <AvatarFallback className="text-3xl text-foreground">
                           {user && user?.name.slice(0, 2)}
                        </AvatarFallback>
                     </Avatar>
                  </AlertDialogTrigger>

                  <AlertDialogContent className="p-0">
                     <Dropzone
                        acceptedFileTypes={["pdf", "doc", "docx"]}
                        maxSizeMB={10}
                        maxFiles={3}
                     />
                  </AlertDialogContent>
               </AlertDialog>

               <h3
                  className="
                  mt-3 text-2xl font-medium 
                  400:text-[26px]
               "
               >
                  {user?.name}
               </h3>

               <p>Experience: 1year Experience</p>
               <p>Location: Lagos, Nigeria</p>
            </div>
         </div>
      </Card>
   );
};

export default Header;
