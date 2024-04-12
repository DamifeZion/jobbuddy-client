"use client";
import { ProjectCardLayoutProps } from "@/types";
import {
   z,
   Form,
   FormControl,
   FormField,
   FormLabel,
   useForm,
   zodResolver,
   FormItem,
   FormMessage,
   Button,
   Input,
   toast
} from "../../form-config";



const RenameFileForm = ({ project }: ProjectCardLayoutProps) => {
   //NOTE: Define form fields, validation, and error message
   const formSchema = z.object({
      filename: z.string().min(2, {
         message: "Filename must be at least 2 characters",
      }),
   });

   //NOTE: Setting default form field values
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         filename: project.title,
      },
   });

   //TODO: SUbmit the form using the redux toolkit query when the api has been built.
   const onSubmit = (values: z.infer<typeof formSchema>) => {

      
      toast.info(`Your data: ${JSON.stringify(values)}`);
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <FormField
               control={form.control}
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

            <Button type="submit">Save</Button>
         </form>
      </Form>
   );
};

export default RenameFileForm;
