import { UploadedFileProps, UseFileDropzoneProps } from "@/types";
import { uploadFileToCloudinary } from "@/util/shared/cloudinary-util";
import { useCallback, useEffect, useState } from "react";
import { FileRejection } from "react-dropzone";
import { toast } from "sonner";
import { ReactNode } from "react";

export const useFileDropzone = ({
   maxFiles,
   maxFileSizeMB,
   acceptedFileTypes,
}: UseFileDropzoneProps) => {
   const [files, setFiles] = useState<File[]>([]);
   const [uploadProgress, setUploadProgress] = useState<{
      [fileName: string]: number;
   }>({});
   const [uploadedFiles, setUploadedFiles] = useState<UploadedFileProps[]>([]);
   const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);

   let fileQuantityDescriptor = maxFiles <= 1 ? "file" : "files";

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

   /*NOTE: This useEffect hook is necessary to handle the scenario where the user tries to upload more files than the maximum limit.
    *  It checks if the number of files exceeds the maximum limit every time the user selects a file after the initial drag and drop.
    *  This works in conjunction with the function in the onDropzoneDrop to fully protect against uploading files when the maximum acceptable file count is reached.
    *  If the number of files exceeds the maximum limit, it displays an error message and keeps only the first 'maxFiles' number of files.
    */
   useEffect(() => {
      if (files.length > maxFiles) {
         toast.error(
            <p>
               You can&apos;t upload more than{" "}
               <b>
                  {maxFiles} {fileQuantityDescriptor}
               </b>
            </p>,
            { closeButton: false }
         );

         //NOTE: Keep only the first 'maxFiles' number of files
         setFiles((prevFiles) => prevFiles.slice(0, maxFiles));
      }
   }, [files, maxFiles, fileQuantityDescriptor]);

   const onDropzoneDrop = useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
         let tooManyFilesError = false;

         if (acceptedFiles.length) {
            //NOTE: If there is maxFiles, then we evaluate and set or reject, else we set it
            setFiles((previousFiles) => [...previousFiles, ...acceptedFiles]);
         }

         if (rejectedFiles.length) {
            rejectedFiles.forEach((file) => {
               file.errors.forEach((error) => {
                  let errorMessage: string | ReactNode = "";

                  switch (error.code) {
                     case "file-invalid-type":
                        errorMessage = (
                           <p>
                              {file.file.name} is not of type{" "}
                              <b className="capitalize">{acceptedFileTypes}</b>
                           </p>
                        );
                        break;
                     case "too-many-files":
                        if (!tooManyFilesError) {
                           errorMessage = (
                              <p>
                                 You can&apos;t upload more than{" "}
                                 <b>
                                    {maxFiles} {fileQuantityDescriptor}
                                 </b>
                              </p>
                           );
                           tooManyFilesError = true; //NOTE: Prevents showing this error more than once
                        }
                        break;
                     case "file-too-large":
                        errorMessage = (
                           <p>
                              {file.file.name} is larger than{" "}
                              <b>{maxFileSizeMB}MB</b>
                           </p>
                        );
                        break;
                     default:
                        errorMessage = error.code;
                  }

                  if (errorMessage) {
                     toast.error(errorMessage, {
                        duration: 6000,
                        closeButton: false,
                     });
                  }
               });
            });
         }
      },
      [
         setFiles,
         maxFileSizeMB,
         acceptedFileTypes,
         maxFiles,
         fileQuantityDescriptor,
      ]
   );

   return {
      files,
      setFiles,
      rejectedFiles,
      setRejectedFiles,
      uploadProgress,
      uploadedFiles,
      uploadFile,
      onDropzoneDrop,
   };
};
