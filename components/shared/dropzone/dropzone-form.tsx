import { FaCloudUploadAlt } from "react-icons/fa";
import { SyntheticEvent, useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { MyDropzoneProps } from "@/types";
import { LoadingIcon } from "@/components/shared/loading-icon";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { RejectedFile } from "./rejected-file";
import { AcceptedFile } from "./accepted-files";
import { StoreRootState } from "@/services/redux-provider/store";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "@/services/slices/loading-slice/loading-slice";
import { cn } from "@/lib/utils";
import { useFileDropzone } from "@/hooks/useFileDropzone";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Dropzone = ({
   className,
   title = "Upload your file",
   description,
   closeOnFinish,
   acceptedFileTypes,
   accept,
   maxFiles = 1,
   disabled,
   maxFileSizeMB,
   ...props
}: MyDropzoneProps) => {
   //NOTE: If either accept or acceptedFileTypes is missing and one is present, we throw an error.
   if (acceptedFileTypes && !accept) {
      throw new Error(
         "You cant use 'acceptFileTypes' props without specifying 'accept' props. "
      );
   } else if (!acceptedFileTypes && accept) {
      throw new Error(
         "You cant use 'accept' props without specifying 'acceptFileTypes'. "
      );
   }

   const dispatch = useDispatch();
   const { isLoading } = useSelector(
      (state: StoreRootState) => state.loadingSlice
   );

   const {
      files,
      setFiles,
      rejectedFiles,
      setRejectedFiles,
      uploadProgress,
      uploadedFiles,
      uploadFile,
      onDropzoneDrop,
   } = useFileDropzone({
      maxFiles,
      maxFileSizeMB,
      acceptedFileTypes,
   }); //NOTE: Add the maxFiles and maxFileSizeMB so the dropzone can allow or disallow uploads

   const {
      getRootProps,
      getInputProps,
      isDragActive,
      isDragReject,
      isDragAccept,
   } = useDropzone({
      onDrop: onDropzoneDrop,
      disabled: disabled || isLoading,
      maxSize: maxFileSizeMB ? maxFileSizeMB * 1024 * 1024 : undefined, //NOTE: Convert MB to bytes
      maxFiles,
      accept,
      ...props,
   });

   //NOTE: The below conditionally renders if the file is more than 1 or not. Wont break the code but wont make users know it one file or more they should upload
   let fileQuantityDescriptor = maxFiles <= 1 ? "file" : "files";

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
         setRejectedFiles((prevFiles) =>
            prevFiles.filter(({ file }) => file.name !== name)
         );
      }
   };

   const deleteUploadedFile = () => {
      // NOTE: Make a query to Server to delete the file from the Server when a user click cancel
   };

   //NOTE: Here you simply upload the file url and in the node server for DB storing
   const handleSubmit = async (e: SyntheticEvent) => {
      e.preventDefault();

      //NOTE: Set the global loading state to true;
      dispatch(setIsLoading(true));

      try {
         await Promise.all(files.map(uploadFile));

         //NOTE: Save the state "uploadedFiles" to the server to store in DB
         // await saveToDatabase(uploadedFiles);

         //NOTE: Reset the global loading state.
         dispatch(setIsLoading(false));

         toast.success(
            <p>
               Successfully uploaded {maxFiles} {fileQuantityDescriptor}
            </p>
         ); //Temporary toast until the server api is ready.

         //NOTE: Close the dialog to run on successful upload. The state 'open' manipulation will be done on the parent element where the dialog is
         if (closeOnFinish) {
            closeOnFinish();
         }
      } catch (error: any) {
         dispatch(setIsLoading(false));
         toast.error(error.message);
      }
   };

   return (
      <Card
         className={cn(
            "max-h-[inherit] grid grid-rows-[auto_1fr_auto] rounded-[inherit] relative",
            {
               "select-none pointer-events-none": isLoading,
            }
         )}
      >
         <CardHeader>
            <CardTitle>{title}</CardTitle>
         </CardHeader>

         <ScrollArea>
            <button
               id="disabled-overlay"
               className={cn(
                  "size-full absolute inset-0 bg-background/60 opacity-0 invisible ease-linear duration-100 transition-all",
                  {
                     "opacity-100 visible": isLoading,
                  }
               )}
            />

            <CardContent>
               {description && (
                  <p className="text-muted-foreground">{description}</p>
               )}

               <form encType="multipart/form-data">
                  <div
                     {...getRootProps({
                        className: `group/dropzone mt-6 px-1 py-4 flex flex-col aspect-video w-full items-center justify-center rounded-md border-4 border-dotted border-spacing-6 transition-all ease-linear duration-150 focus-within:ring-transparent ${!isLoading && "hover:border-primary cursor-pointer"} ${isDragAccept && "border-primary *:text-primary"}  ${isDragReject && "border-destructive *:text-destructive"} ${className}`,
                     })}
                  >
                     <input {...getInputProps()} />

                     <FaCloudUploadAlt className="mb-4 size-12 text-muted-foreground group-hover/dropzone:text-primary" />

                     {isDragActive ? (
                        !isDragReject && (
                           <p className="text-center text-balance group-hover/dropzone:text-primary">
                              Drop the {fileQuantityDescriptor} here...
                              <span className="sr-only">
                                 Drop the {fileQuantityDescriptor} here
                              </span>
                           </p>
                        )
                     ) : (
                        <div
                           className={cn(
                              "text-center text-balance [&_b]:font-medium"
                           )}
                        >
                           <p className="text-lg leading-tight">
                              Drag and drop your {fileQuantityDescriptor} here
                           </p>

                           <p>or</p>

                           <p className="text-lg  leading-tight hover:underline hover:underline-offset-2 hover:text-primary">
                              Browse
                           </p>

                           <span className="mt-2 text-sm text-muted-foreground block">
                              maximum file size: <b>{maxFileSizeMB}MB</b>
                           </span>

                           <span className="text-sm text-muted-foreground">
                              accepted file types: <b>{acceptedFileTypes}</b>
                           </span>

                           <span className="sr-only">Upload</span>
                        </div>
                     )}

                     {isDragActive && isDragReject && (
                        <p className="text-center text-balance group-hover/dropzone:text-primary">
                           Invalid {fileQuantityDescriptor} type or too many
                           files. Please drop a supported file and no more than{" "}
                           {maxFiles} {fileQuantityDescriptor}.
                           <span className="sr-only">
                              Invalid {fileQuantityDescriptor} type or too many
                              files. Please drop a supported file and no more
                              than {maxFiles} {fileQuantityDescriptor}.
                           </span>
                        </p>
                     )}
                  </div>

                  {/*NOTE: If there is a file, we show the file and then show a preview below the dropzone */}
                  {(files.length > 0 || uploadedFiles.length > 0) && (
                     <div className="mt-6 space-y-3 w-full">
                        <h1>
                           {files.length > 0 &&
                              `Accepted ${fileQuantityDescriptor} ${files.length}`}
                        </h1>

                        <h1>
                           {uploadedFiles.length > 0 &&
                              `Uploaded ${fileQuantityDescriptor} ${uploadFile.length}`}
                        </h1>

                        <Separator />

                        <ul className="grid gap-4">
                           {/* ACCEPTED FILES BEGINS */}
                           {files.map((file, index) => (
                              <AcceptedFile
                                 key={index}
                                 file={file}
                                 uploadProgress={uploadProgress[file.name]}
                                 onDelete={() =>
                                    removeFile(file.name, "accepted")
                                 }
                              />
                           ))}

                           {uploadedFiles.map((file, index) => (
                              <AcceptedFile
                                 key={index}
                                 file={file}
                                 onDelete={() =>
                                    removeFile(
                                       file.original_filename,
                                       "accepted"
                                    )
                                 }
                              />
                           ))}
                           {/* ACCEPTED FILES ENDS */}
                        </ul>
                     </div>
                  )}

                  {/* REJECTED FILES BEGINS */}
                  {rejectedFiles.length > 0 && (
                     <div className="mt-6 space-y-3">
                        <h1>Rejected File(s)</h1>

                        <Separator />

                        <ul className="grid gap-4">
                           {rejectedFiles.map(({ file, errors }) => (
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
               </form>
            </CardContent>
         </ScrollArea>

         <CardFooter
            id="upload"
            className={cn("pt-6 flex items-center justify-end gap-4")}
         >
            <AlertDialogCancel disabled={isLoading} className="mt-0">
               Cancel
            </AlertDialogCancel>

            <Button
               disabled={isLoading || files.length === 0}
               onClick={handleSubmit}
            >
               {isLoading && <LoadingIcon />}
               {isLoading ? "Uploading" : "Upload"}
            </Button>
         </CardFooter>
      </Card>
   );
};
