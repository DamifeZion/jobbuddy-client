import { UploadedFileProps } from "@/types";
import { uploadFileToCloudinary } from "@/util/shared/cloudinary-util";
import { useCallback, useState } from "react";
import { FileRejection } from "react-dropzone";
import { toast } from "sonner";

export const useUploadFile = () => {
   const [files, setFiles] = useState<File[]>([]);
   const [uploadProgress, setUploadProgress] = useState<{
      [fileName: string]: number;
   }>({});
   const [uploadedFiles, setUploadedFiles] = useState<UploadedFileProps[]>([]);
   const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

   const uploadFile = useCallback(async (file: File) => {
      setUploadProgress((prev) => ({
         ...prev,
         [file.name]: 0,
      }));

      try {
         const response = (await uploadFileToCloudinary(file, (progress) => {
            setUploadProgress((prev) => ({
               ...prev,
               [file.name]: progress,
            }));
         })) as UploadedFileProps;

         setUploadedFiles((prevUploadedFiles) => {
            const updated = [...prevUploadedFiles] as UploadedFileProps[];
            updated.push(response);
            return updated;
         });

         // Remove the successful file from the files array
         setFiles((prevFiles) =>
            prevFiles.filter((prevFile) => prevFile.name !== file.name)
         );
      } catch (error: any) {
         toast.error(`Error uploading file ${file.name}: ${error.message}`);

         setRejectedFiles((prevRejectedFiles) => [
            ...prevRejectedFiles,
            {
               file,
               errors: [
                  {
                     message: error.message,
                     code: "file-upload-error",
                  },
               ],
            },
         ]);

         // Remove the failed file from the files array
         setFiles((prevFiles) =>
            prevFiles.filter((prevFile) => prevFile.name !== file.name)
         );
      }
   }, []);

   return {
      files,
      setFiles,
      rejectedFiles,
      setRejectedFiles,
      uploadProgress,
      uploadedFiles,
      uploadFile,
   };
};
