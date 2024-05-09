import { UploadedFileProps, UseFileDropzoneProps } from "@/types";
import { uploadFileToCloudinary } from "@/util/shared/cloudinary-util";
import { useCallback, useState } from "react";
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
                              <b className="capitalize">
                                 {acceptedFileTypes.join(", ")}
                              </b>
                           </p>
                        );
                        break;
                     case "too-many-files":
                        if (!tooManyFilesError) {
                           let fileQuantityDescriptor =
                              maxFiles <= 1 ? "file" : "files";
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
                     });
                  }
               });
            });
         }
      },
      [setFiles, maxFileSizeMB, acceptedFileTypes, maxFiles]
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
