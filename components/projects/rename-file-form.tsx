"use client";
import {
   FormErrorProps,
   FormSuccessProps,
   ProjectCardLayoutProps,
} from "@/types";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LoadingIcon } from "@/components/shared/loading-icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
   Form,
   FormControl,
   FormField,
   FormLabel,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRenameFileMutation } from "@/services/api/dashboard/projects/rename-file-api";
import { useIsLoading } from "@/hooks/shared/useIsLoading";
import { StoreRootState } from "@/services/redux-provider/store";
import { useSelector } from "react-redux";

const RenameFileForm = () => {
   const dispatch = useDispatch();
   const [renameFile, { isLoading, error }] = useRenameFileMutation();
   const { activeProject } = useSelector(
      (state: StoreRootState) => state.projectSlice
   );

   //NOTE: Update the loading state globally to pause and disable flows like dialogs, e.t.c.
   useIsLoading(isLoading);

   //NOTE: Define form fields, validation, and error message
   const formSchema = z.object({
      filename: z.string().min(5, {
         message: "Filename must be at least 5 characters",
      }),
      projectId: z.string(),
   });

   //NOTE: Setting default form field values
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         filename: activeProject.title,
         projectId: activeProject.id,
      },
   });

   //TODO: SUbmit the form using the redux toolkit query when the api has been built.
   const onSubmit = (values: z.infer<typeof formSchema>) => {
      renameFile(values)
         .unwrap()
         .then((data: FormSuccessProps) => {
            // toast.success(data.message);
            alert(JSON.stringify(data));
         })
         .catch((err: FormErrorProps) => {
            // toast.error(err)
            alert(JSON.stringify(err));
         });
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
         >
            <FormField
               control={form.control}
               disabled={isLoading}
               name="filename"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Filename</FormLabel>
                     <FormControl>
                        <Input placeholder="Enter new filename" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <Button type="submit" disabled={isLoading} className="ml-auto">
               {isLoading && <LoadingIcon />} Save Changes
            </Button>
         </form>
      </Form>
   );
};

export default RenameFileForm;
