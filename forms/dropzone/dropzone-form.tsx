import { Upload } from "lucide-react";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { MyDropzoneProps } from "@/types";
import Image from "next/image";
import { StoreRootState } from "@/services/store";
import { Button } from "../form-config";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";

export const Dropzone = ({ className, ...props }: MyDropzoneProps) => {
   const [files, setFiles] = useState<File[]>([]);
   const [rejected, setRejected] = useState<FileRejection[]>([]);

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

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
         "image/*": [],
      },
   });

   const removeFile = (name: File["name"]) => {
      setFiles((files) => files.filter((file) => file.name !== name));
   };

   const removeRejected = (name: File["name"]) => {
      setRejected((files) => files.filter(({ file }) => file.name !== name));
   };

   return (
      <form encType="multipart/form-data">
         <div
            {...getRootProps({
               className: cn(
                  "group/dropzone mt-6 flex flex-col aspect-video w-full items-center justify-center rounded-md border-4 border-dotted border-spacing-6 cursor-pointer transition-all ease-linear duration-150 focus-within:ring-transparent hover:border-primary",
                  className
               ),
            })}
         >
            <input {...getInputProps()} />

            {isDragActive ? (
               <p className="text-center text-balance group-hover/dropzone:text-primary">
                  Drop the file(s) here ...
                  <span className="sr-only">Drop the file(s) here</span>
               </p>
            ) : (
               <p className="text-center text-balance group-hover/dropzone:text-primary">
                  Drag and drop your files(s) here, or click to select file(s)
                  <span className="sr-only">Upload</span>
               </p>
            )}

            <Upload className="mt-6 size-7 text-muted-foreground group-hover/dropzone:text-primary" />
         </div>

         {/*NOTE: If there is a file, we show the file and then show a preview below the dropzone */}
         {files.length > 0 && (
            <div className="mt-6 space-y-3">
               <h1>Accepted File(s)</h1>

               <Separator />

               <ul className="grid grid-cols-3 gap-4">
                  {files.map((file, index) => (
                     <div key={index} id="img-preview">
                        <div className="relative">
                           <div className="border-2 p-0.5 border-muted rounded-md">
                              <Image
                                 alt={file.name}
                                 className="aspect-square size-full rounded-md object-cover pointer-events-none"
                                 height="84"
                                 src={URL.createObjectURL(file) || ""}
                                 width="84"
                              />
                           </div>

                           <Button
                              size="icon"
                              variant="destructive"
                              type="button"
                              onClick={() => removeFile(file.name)}
                              className="size-fit p-1 absolute top-1.5 right-1.5 rounded-full"
                           >
                              <Cross2Icon className="size-4" />
                           </Button>
                        </div>

                        <p className="text-muted-foreground text-md break-words">
                           {file.name}
                        </p>
                     </div>
                  ))}
               </ul>
            </div>
         )}

         {rejected.length > 0 && (
            <div className="mt-6 space-y-3">
               <h1>Rejected File(s)</h1>

               <Separator />

               <ul className="grid gap-4">
                  {rejected.map(({ file, errors }) => (
                     <li
                        key={file.name}
                        id="img-preview"
                        className="flex flex-wrap gap-4 justify-between"
                     >
                        <div className="max-400:w-full">
                           <p className="text-muted-foreground font-medium">
                              {file.name}
                           </p>

                           <ul className="text-sm text-destructive">
                              {errors.map((error, index) => (
                                 <li key={index}> {error.message} </li>
                              ))}
                           </ul>
                        </div>

                        <Button
                           variant="destructive"
                           type="button"
                           onClick={() => removeRejected(file.name)}
                        >
                           Remove
                        </Button>
                     </li>
                  ))}
               </ul>
            </div>
         )}

         <div id="upload" className="mt-6 flex justify-end">
            <Button>
               Upload
            </Button>
         </div>
      </form>
   );
};
