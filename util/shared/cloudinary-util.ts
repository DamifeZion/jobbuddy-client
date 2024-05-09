import { UploadedFileProps } from "@/types";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

//NOTE: All this values was used at development. If you refactor your cloudinary directory, ensure to update all the values in this file

//NOTE: Handle file upload and get progress
export const uploadFileToCloudinary = (
   file: File,
   onProgress: (percentage: number) => void,
   options?: {
      upload_preset?: string;
      cloud_name?: string;
      folderDir?: string;
   }
) => {
   const { upload_preset, cloud_name, folderDir } = options || {};
   const key = upload_preset || "employee";
   const cloudName = cloud_name || "dy1efv86w";

   //NOTE: Determine the resource type based on the file type
   let resourceType;
   if (file.type.startsWith("image/")) {
      resourceType = "image";
   } else if (file.type.startsWith("video/")) {
      resourceType = "video";
   } else {
      resourceType = "raw";
   }

   return new Promise((resolve, reject) => {
      //NOTE: Determine the folder based on the file type
      let folderType;

      if (file.type.startsWith("image/")) {
         folderType = "employee/images";
      } else if (file.type.startsWith("video/")) {
         folderType = "employee/videos";
      } else if (
         file.type.startsWith("application/") ||
         file.type.startsWith("text/")
      ) {
         folderType = "employee/documents";
      } else {
         folderType = folderDir || "employee/others";
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", key);
      formData.append("folder", folderType);
      formData.append("cloud_name", cloudName);

      axios
         .post(
            `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
            formData,
            {
               onUploadProgress: (event) => {
                  if (event.progress) {
                     onProgress(Math.round(event.progress * 100));
                  }
               },
            }
         )
         .then((res) => resolve(res.data)) //NOTE: Resolve the promise with the response
         .catch((err: AxiosError) => reject(err)); //NOTE: Reject the promise with the response
   });
};
