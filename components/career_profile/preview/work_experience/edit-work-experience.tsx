"use client";

import "@/app/css/tiptap.css";
import { Button } from "@/components/ui/button";
import {
   AlertDialogContent,
   AlertDialogHeader,
   AlertDialogFooter,
   AlertDialogCancel,
   AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { careerConstants } from "@/constants/career-const";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ComboBox } from "@/components/ui/combo-box";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Tiptap from "@/components/shared/tiptap/tiptap";
import { EditWorkExperienceProps } from "@/types";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/services/slices/loading-slice/loading-slice";

const formSchema = z
   .object({
      companyName: z
         .string()
         .optional()
         .refine((value) => value != null && value.length >= 5, {
            message: "Please add the name of the company",
         }),

      jobTitle: z
         .string()
         .optional()
         .refine((value) => value != null && value.length >= 5, {
            message: "Please enter your job title",
         }),

      jobLevel: z
         .string()
         .optional()
         .refine((value) => value != null && value.length >= 5, {
            message: "Please enter your job level",
         }),

      workType: z
         .string()
         .optional()
         .refine((value) => value != null && value.length >= 5, {
            message: "Please select work type",
         }),

      workMode: z
         .string()
         .optional()
         .refine((value) => value != null && value.length >= 5, {
            message: "Please select work mode",
         }),

      country: z
         .string()
         .optional()
         .refine((value) => value != null && value.length >= 3, {
            message: "Please add the location of your job",
         }),

      state: z
         .string()
         .optional()
         .refine((value) => value != null && value.length >= 3, {
            message: "Please add the location of your job",
         }),

      city: z
         .string()
         .optional()
         .refine((value) => value != null && value.length >= 3, {
            message: "Please add the location of your job",
         }),

      startDate: z.date().refine((value) => value !== null, {
         message: "Please select start date",
      }),

      endDate: z.date().optional(),

      currentJob: z.boolean(),

      jobResponsibilities: z
         .string()
         .optional()
         .transform((content) => JSON.stringify(content)) // Convert Content to string
         .refine(
            (value) =>
               value !== undefined && value !== null && value.length >= 250,
            {
               message:
                  "Please enter your job tasks and responsibilities. Minimum of 250 characters",
            }
         ),
   })
   .refine(
      (data) => {
         //NOTE: If currentJob is false, endDate must not be empty
         if (!data.currentJob && !data.endDate) {
            return false;
         }
         //NOTE: Otherwise, endDate can be empty
         return true;
      },
      {
         message: "Please select end date",
         path: ["endDate"], //NOTE: This specifies that the error is associated with the endDate field
      }
   );

export const EditWorkExperience = ({
   title = "Add Work Experience",
   initialCompanyName,
   initialJobTitle,
   initialJobLevel,
   initialWorkType,
   initialWorkMode,
   initialCountry,
   initialState,
   initialCity,
   initialStartDate,
   initialEndDate,
   initialCurrentJob = false,
   initialJobResponsibilities,
   closeModal,
}: EditWorkExperienceProps) => {
   const {
      workExperience: { jobLevelOptions, workType, workMode },
   } = careerConstants;
   const dispatch = useDispatch();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),

      // NOTE: We set the default value to the value passed, if pressent else
      defaultValues: {
         companyName: initialCompanyName,
         jobTitle: initialJobTitle,
         jobLevel: initialJobLevel,
         workType: initialWorkType,
         workMode: initialWorkMode,
         country: initialCountry,
         state: initialState,
         city: initialCity,
         startDate: initialStartDate,
         endDate: initialEndDate,
         currentJob: initialCurrentJob,
         jobResponsibilities: initialJobResponsibilities,
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      console.log(values);
      closeModal();
   }

   return (
      <AlertDialogContent className="px-0 sm:w-full sm:max-w-xl 800:max-w-screen-700 ">
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="max-h-[90dvh] h-full flex flex-col overflow-auto"
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
                        name="companyName"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                 <Input placeholder="Company Name" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Job Title</FormLabel>
                              <FormControl>
                                 <Input placeholder="Job Title" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="jobLevel"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Job Level</FormLabel>
                              <FormControl>
                                 <ComboBox
                                    array={jobLevelOptions}
                                    placeholder="Please select a job level"
                                    defaultValue={
                                       field.value && field.value.toLowerCase()
                                    }
                                    onValueChange={(value) => {
                                       form.setValue("jobLevel", value);
                                    }}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="workType"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Work Type</FormLabel>
                              <FormControl>
                                 <ComboBox
                                    array={workType}
                                    defaultValue={
                                       field.value && field.value.toLowerCase()
                                    }
                                    placeholder="Please select a work type"
                                    onValueChange={(value) => {
                                       form.setValue("workType", value);
                                    }}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="workMode"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Work Mode</FormLabel>
                              <FormControl>
                                 <ComboBox
                                    array={workMode}
                                    defaultValue={
                                       field.value && field.value.toLowerCase()
                                    }
                                    placeholder="Please select a work mode"
                                    onValueChange={(value) => {
                                       form.setValue("workMode", value);
                                    }}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                 <Input placeholder="country" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                 <Input placeholder="state" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                 <Input placeholder="city" {...field} />
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
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                 <DatePicker
                                    defaultValue={field.value && field.value}
                                    onValueChange={(value: Date) => {
                                       form.setValue("startDate", value);
                                    }}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* NOTE: Add end date field if 'currentJob' is false */}
                     {!form.watch("currentJob") && (
                        <FormField
                           control={form.control}
                           name="endDate"
                           render={({ field }) => (
                              <FormItem
                                 className={cn("", {
                                    "sm:col-span-2": form.watch("currentJob"),
                                 })}
                              >
                                 <FormLabel>End Date</FormLabel>
                                 <FormControl>
                                    <DatePicker
                                       defaultValue={field.value && field.value}
                                       onValueChange={(value: Date) => {
                                          form.setValue("endDate", value);
                                       }}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     )}

                     <FormField
                        control={form.control}
                        name="currentJob"
                        render={({ field }) => (
                           <FormItem className="flex items-center gap-2 sm:col-span-2 *:!mt-0">
                              <FormControl>
                                 <Checkbox
                                    id="currentJob"
                                    className="size-5"
                                    checked={field.value}
                                    onCheckedChange={(value: boolean) => {
                                       form.setValue("currentJob", value);
                                    }}
                                 />
                              </FormControl>
                              <FormLabel htmlFor="currentJob">
                                 I currently work here
                              </FormLabel>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="jobResponsibilities"
                        render={({ field }) => (
                           <FormItem className="sm:col-span-2 shadow-sm">
                              <FormLabel>Job Responsibilities</FormLabel>

                              <FormControl>
                                 {/* NOTE: For now we use text area, later we use CK-Editor or the likes */}
                                 <Tiptap
                                    content={field.value}
                                    onChange={field.onChange}
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
