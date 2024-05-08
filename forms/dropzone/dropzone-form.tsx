import { Upload } from "lucide-react";
import { SyntheticEvent, useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { MyDropzoneProps, UploadedFileProps } from "@/types";
import { Button, LoadingIcon, toast } from "../form-config";
import { Separator } from "@/components/ui/separator";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { uploadFileToCloudinary } from "@/util/shared/cloudinary-util";
import { RejectedFile } from "./rejected-file";
import { AcceptedFile } from "./accepted-files";
import { StoreRootState } from "@/services/store";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@/services/slices/loading-slice/loadingSlice";
import { cn } from "@/lib/utils";

export const Dropzone = ({
   className,
   isAlertDialog = true,
   ...props
}: MyDropzoneProps) => {
   const dispatch = useDispatch();
   const { isLoading } = useSelector(
      (state: StoreRootState) => state.loadingSlice
   );
   const [files, setFiles] = useState<File[]>([]);
   const [rejected, setRejected] = useState<FileRejection[]>([]);
   const [uploadProgress, setUploadProgress] = useState<{
      [fileName: string]: number;
   }>({});
   const [uploadedFiles, setUploadedFiles] = useState<UploadedFileProps[]>([]);

   const onDrop = useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
         if (acceptedFiles.length) {
            setFiles((previousFiles) => [...previousFiles, ...acceptedFiles]);
         }

         if (rejectedFiles.length) {
            setRejected((previousFiles) => [
               ...previousFiles,
               ...rejectedFiles,
            ]);
         }
      },
      []
   );

   const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
      isDragAccept,
   } = useDropzone({
      onDrop,
      disabled: isLoading,
      accept: {
         "image/*": [],
      },
   });

   const removeFile = async (
      name: string,
      fileType: "accepted" | "rejected"
   ) => {
      //NOTE: Remove the file from the given state
      if (fileType === "accepted") {
         setFiles((prevFiles) =>
            prevFiles.filter((file) => file.name !== name)
         );
      } else if (fileType === "rejected") {
         setRejected((prevFiles) =>
            prevFiles.filter(({ file }) => file.name !== name)
         );
      }
   };

   const deleteAllUploadedFiles = () => {
      // NOTE: Make a query to Server to delete the file from the Server
   };

   //NOTE: Here you simply upload the file url and in the node server for DB storing
   const handleSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();

      //NOTE:-[STEP 1] Set the global loading state to true;
      dispatch(setIsLoading(true));

      //NOTE:-[STEP 2] First upload the file to Cloudinary on submit
      try {
         const uploadPromises = files.map((file) => {
            setUploadProgress((prev) => ({
               ...prev,
               [file.name]: 0,
            }));

            return uploadFileToCloudinary(file, (progress) => {
               setUploadProgress((prev) => ({
                  ...prev,
                  [file.name]: progress,
               }));
            });
         });

         Promise.all(uploadPromises).then((responses) => {
            responses.forEach((response: any) => {
               // NOTE: Push the url and resource type to the state
               setUploadedFiles((prevUploadedFiles) => {
                  const updated = [...prevUploadedFiles] as UploadedFileProps[];
                  updated.push(response);
                  return updated;
               });

               //NOTE: Remove the file from the files array
               setFiles((prevFiles) =>
                  prevFiles.filter(
                     (prevFile) => prevFile.name !== response.original_filename
                  )
               );
            });
         });
         //NOTE:-[STEP 3] Save the state "uploadedFiles" to the server to store in DB BELOW👇🏽

         //NOTE:-[STEP 4] Set the global loading state back to false
         dispatch(setIsLoading(false));
      } catch (error: any) {
         dispatch(setIsLoading(false));
         toast.error(error.message);
      }
   };

   console.log(uploadProgress, uploadedFiles, isLoading);

   return (
      <form
         encType="multipart/form-data"
         onSubmit={handleSubmit}
         className="relative"
      >
         <span
            id="disabled-overlay"
            className={cn(
               "size-full absolute inset-0 bg-background/40 opacity-0 invisible ease-linear duration-100 transition-all",
               {
                  "opacity-100 visible z-50 pointer-events-none": isLoading,
               }
            )}
         />

         <div
            {...getRootProps({
               className: `group/dropzone mt-6 flex flex-col aspect-video w-full items-center justify-center rounded-md border-4 border-dotted border-spacing-6 cursor-pointer transition-all ease-linear duration-150 focus-within:ring-transparent ${!isLoading && "hover:border-primary"} ${isDragAccept && "border-primary *:text-primary"}  ${isDragReject && "border-destructive *:text-destructive"} ${className}`,
            })}
         >
            <input {...getInputProps()} />

            {isDragActive ? (
               !isDragReject && (
                  <p className="text-center text-balance group-hover/dropzone:text-primary">
                     Drop the file(s) here...
                     <span className="sr-only">Drop the file(s) here</span>
                  </p>
               )
            ) : (
               <p className="text-center text-balance group-hover/dropzone:text-primary">
                  Drag and drop your files(s) here, or click to select file(s)
                  <span className="sr-only">Upload</span>
               </p>
            )}

            {isDragActive && isDragReject && (
               <p className="text-center text-balance group-hover/dropzone:text-primary">
                  Invalid file(s) type. Please drop a supported file.
                  <span className="sr-only">
                     Invalid file(s) type. Please drop a supported file.
                  </span>
               </p>
            )}

            <Upload className="mt-6 size-7 text-muted-foreground group-hover/dropzone:text-primary" />
         </div>

         {/*NOTE: If there is a file, we show the file and then show a preview below the dropzone */}
         {(files.length > 0 || uploadedFiles.length > 0) && (
            <div className="mt-6 space-y-3">
               <h1>Accepted File(s)</h1>

               <Separator />

               <ul className="grid gap-4">
                  {/* ACCEPTED FILES BEGINS */}
                  {files.map((file, index) => (
                     <AcceptedFile
                        key={index}
                        file={file}
                        uploadProgress={uploadProgress[file.name]}
                        onDelete={() => removeFile(file.name, "accepted")}
                     />
                  ))}

                  {uploadedFiles.map((file, index) => (
                     <AcceptedFile
                        key={index}
                        file={file}
                        onDelete={() =>
                           removeFile(file.original_filename, "accepted")
                        }
                     />
                  ))}
                  {/* ACCEPTED FILES ENDS */}
               </ul>
            </div>
         )}

         {/* REJECTED FILES BEGINS */}
         {rejected.length > 0 && (
            <div className="mt-6 space-y-3">
               <h1>Rejected File(s)</h1>

               <Separator />

               <ul className="grid gap-4">
                  {rejected.map(({ file, errors }) => (
                     <RejectedFile
                        key={file.name}
                        file={file}
                        errors={errors}
                        onDelete={removeFile}
                     />
                  ))}
               </ul>
            </div>
         )}
         {/* REJECTED FILES ENDS */}

         <div id="upload" className="mt-6 flex items-center justify-end gap-4">
            {isAlertDialog && (
               <AlertDialogCancel
                  disabled={isLoading}
                  onClick={deleteAllUploadedFiles}
                  className="mt-0"
               >
                  Cancel
               </AlertDialogCancel>
            )}

            <Button disabled={isLoading}>
               {isLoading && <LoadingIcon />}
               {isLoading ? "Uploading" : "Upload"}
            </Button>
         </div>
      </form>
   );
};
