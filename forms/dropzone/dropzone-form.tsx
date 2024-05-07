import { Upload } from "lucide-react";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { MyDropzoneProps } from "@/types";
import Image from "next/image";
import { Button } from "../form-config";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";

//NOTE: Handle file upload and get progress
const uploadFile = (
   files: File[],
   onProgress: (percentage: number) => void
) => {
   const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
   const key = "docs_upload_example_us_preset";

   // Create an array to store all the promises
   const uploadPromises = files.map((file) => {
      return new Promise((res, rej) => {
         const xhr = new XMLHttpRequest();

         xhr.open("POST", url);

         xhr.onload = () => {
            const response = JSON.parse(xhr.responseText);
            res(response.secure_url);
         };

         xhr.onerror = (event) => rej(event);

         xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
               const percentage = (event.loaded / event.total) * 100;
               onProgress(Math.round(percentage));
            }
         };

         const formData = new FormData();
         formData.append("file", file);
         formData.append("upload_preset", key);

         xhr.send(formData);
      });
   });

   // Use Promise.all to wait for all the uploads to finish
   return Promise.all(uploadPromises);
};

export const Dropzone = ({
   className,
   isAlertDialog = true,
   ...props
}: MyDropzoneProps) => {
   const [files, setFiles] = useState<File[]>([]);
   const [rejected, setRejected] = useState<FileRejection[]>([]);
   const [progress, setProgress] = useState(0);
   const [cloudFileUrls, setCloudFileUrls] = useState<string[]>([]);

   useEffect(() => {
      const upload = async () => {
         const url = await uploadFile(files, setProgress);
         console.log(url);
         //NOTE: Push the url to the state and store the secure_url in the state;
         // setCloudFileUrls((prevCloudUrl) => [...prevCloudUrl, url]);
      };

      upload();
   }, [files]);

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
   });

   const removeFile = (name: File["name"]) => {
      setFiles((files) => files.filter((file) => file.name !== name));
   };

   const removeRejected = (name: File["name"]) => {
      setRejected((files) => files.filter(({ file }) => file.name !== name));
   };

   const handleSubmit = (e: SyntheticEvent) => {
      e.preventDefault();
   };

   const handleClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();

      //NOTE: Call the Cloudinary API to delete the files using the stored URLs..
      cloudFileUrls.forEach((url) => {
         //NOTE: Replace with your actual Cloudinary API call
         console.log(`Deleting file from Cloudinary: ${url}`);
      });
   };

   return (
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
         <div
            {...getRootProps({
               className: `group/dropzone mt-6 flex flex-col aspect-video w-full items-center justify-center rounded-md border-4 border-dotted border-spacing-6 cursor-pointer transition-all ease-linear duration-150 focus-within:ring-transparent hover:border-primary ${isDragAccept && "border-primary *:text-primary"}  ${isDragReject && "border-destructive *:text-destructive"} ${className}`,
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
         {files.length > 0 && (
            <div className="mt-6 space-y-3">
               <h1>Accepted File(s)</h1>

               <Separator />

               <ul className="grid grid-cols-3 gap-4">
                  {files.map((file, index) => (
                     <div key={index} id="img-preview">
                        <div className="relative">
                           <div className="aspect-square border-2 p-0.5 border-muted rounded-md">
                              {progress === 100 ? (
                                 <Image
                                    alt={file.name}
                                    className="size-full rounded-md object-cover pointer-events-none"
                                    height="84"
                                    src={URL.createObjectURL(file) || ""}
                                    width="84"
                                 />
                              ) : (
                                 <div className="size-full p-2 flex flex-col items-center justify-center absolute top-0 left-0 pointer-events-none rounded-md">
                                    <Progress value={progress} />
                                    <p className="mt-3 text-xsm text-center leading-loose">
                                       uploading... <br />
                                       {progress}%
                                    </p>
                                 </div>
                              )}
                           </div>

                           <Button
                              size="icon"
                              variant="destructive"
                              type="button"
                              onClick={() => removeFile(file.name)}
                              className="size-fit p-1 absolute top-1.5 right-1.5 rounded-full"
                           >
                              <Cross2Icon className="size-3.5" />
                           </Button>
                        </div>

                        <p className="mt-2.5 text-muted-foreground text-sm break-words">
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

         <div id="upload" className="mt-6 flex justify-end gap-4">
            {isAlertDialog && (
               <AlertDialogCancel onClick={handleClose}>
                  Close
               </AlertDialogCancel>
            )}
            <Button>Upload</Button>
         </div>
      </form>
   );
};
