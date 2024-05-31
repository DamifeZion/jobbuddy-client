"use client";

import { LanguageFormProps } from "@/types";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import {
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogFooter,
   AlertDialogCancel,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { setIsLoading } from "@/services/slices/loading-slice/loading-slice";

const formSchema = z.object({
   languages: z
      .string()
      .optional()
      .refine((value) => value != null && value.length >= 3, {
         message: "Please enter at least one language",
      }),
});

export const LanguagesForm = ({
   title = "Add Languages",
   initialLangauages,
   closeModal,
}: LanguageFormProps) => {
   const dispatch = useDispatch();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),

      // NOTE: We set the default value to the value passed, if pressent else
      defaultValues: {
         languages: initialLangauages,
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values, dont forget to set isLoading if loading to disable form.
      console.log(values);
      closeModal();
   }

   return (
      <AlertDialogContent className="px-0 sm:w-full sm:max-w-xl 800:max-w-screen-700">
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="py-0.5 max-h-[90dvh] h-full flex flex-col overflow-auto"
            >
               <AlertDialogHeader className="px-6 pb-2">
                  <AlertDialogTitle className="capitalize">
                     {title}
                  </AlertDialogTitle>
               </AlertDialogHeader>

               <ScrollArea>
                  <div className="pb-2 px-6">
                     <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Enter your Language(s)</FormLabel>
                              <FormDescription>
                                 Separate each language with comma
                              </FormDescription>
                              <FormControl>
                                 <Textarea
                                    placeholder="Ex: English, Chinese, Korean"
                                    {...field}
                                 ></Textarea>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
               </ScrollArea>

               <AlertDialogFooter className="px-6 mt-4 max-sm:gap-2">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button type="submit">Save</Button>
               </AlertDialogFooter>
            </form>
         </Form>
      </AlertDialogContent>
   );
};
