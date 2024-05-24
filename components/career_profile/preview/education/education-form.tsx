"use client";

import { useDispatch } from "react-redux";
import { setIsLoading } from "@/services/slices/loading-slice/loading-slice";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogFooter,
   AlertDialogCancel,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EducationFormProps } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DatePicker } from "@/components/ui/date-picker";

const formSchema = z.object({
   school: z
      .string()
      .optional()
      .refine((value) => value != null && value.length >= 5, {
         message: "Please add the name of the your school",
      }),

   degree: z
      .string()
      .optional()
      .refine((value) => value != null && value.length >= 5, {
         message: "Please enter the degree",
      }),

   fieldOfStudy: z
      .string()
      .optional()
      .refine((value) => value != null && value.length >= 5, {
         message: "Please enter your job level",
      }),

   startDate: z.date().refine((value) => value !== null, {
      message: "Please select start date",
   }),

   endDate: z.date().refine((value) => value !== null, {
      message: "Please select end date",
   }),
});

const EducationForm = ({
   title = "Add Education",
   initialSchool,
   initialDegree,
   initialFieldOfStudy,
   initialStartDate,
   initialEndDate,
   closeModal,
}: EducationFormProps) => {
   const dispatch = useDispatch();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),

      // NOTE: We set the default value to the value passed, if pressent else
      defaultValues: {
         school: initialSchool,
         degree: initialDegree,
         fieldOfStudy: initialFieldOfStudy,
         startDate: initialStartDate,
         endDate: initialEndDate,
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
                  <div className="pb-2 px-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                     <FormField
                        control={form.control}
                        name="school"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>School</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Job buddy institution"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="degree"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Degree</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Bachelor Of Science (B.SC)"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="fieldOfStudy"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Field of study</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Ex: Mass communication"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Start date</FormLabel>
                              <FormControl>
                                 <DatePicker
                                    defaultValue={field.value && field.value}
                                    onValueChange={(value) => {
                                       form.setValue("startDate", value);
                                    }}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>End date</FormLabel>
                              <FormControl>
                                 <DatePicker
                                    defaultValue={field.value && field.value}
                                    onValueChange={(value) => {
                                       form.setValue("endDate", value);
                                    }}
                                 />
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

export default EducationForm;
