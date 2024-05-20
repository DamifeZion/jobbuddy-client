"use client";

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
import { useCountryStateCityData } from "@/hooks/shared/useGetCountryStateCity";
import { DatePicker } from "@/components/ui/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Tiptap from "@/components/shared/tiptap/tiptap";
import { EditWorkExperienceProps } from "@/types";

const formSchema = z
   .object({
      employer: z.string().min(5, {
         message: "Please add the name of your employer",
      }),

      jobTitle: z.string().min(5, {
         message: "Please enter your job title",
      }),

      jobLevel: z.string().min(5, {
         message: "Please enter your job level",
      }),

      industry: z.string().min(5, {
         message: "Please select an industry",
      }),

      jobFunction: z.string().min(5, {
         message: "Please select a Job function",
      }),

      workType: z.string().min(5, {
         message: "Please select work type",
      }),

      country: z.string().min(5, {
         message: "Please enter the location of your job",
      }),

      state: z.string().min(5, {
         message: "Please enter the location of your job",
      }),

      city: z.string(),

      manuallyEnterCity: z.boolean(),

      startDate: z.string().min(5, {
         message: "Please select start date",
      }),

      endDate: z.string(),

      currentJob: z.boolean(),

      jobResponsibilities: z.string().min(250, {
         message:
            "Please enter your job tasks and responsibilities. Minimum of 250 characters",
      }),
   })
   .refine(
      (data) => {
         //NOTE: If currentJob is true, endDate must not be empty
         if (!data.currentJob && data.endDate === "") {
            return false;
         }

         //NOTE: If currentJob is false, endDate can be empty
         return true;
      },
      {
         message: "Please select end date",
         //NOTE: specify the path of the field this message is associated with
         path: ["endDate"],
      }
   )
   .refine(
      (data) => {
         //NOTE: If manuallyEnterCity is true, city must not be empty
         if (
            data.manuallyEnterCity &&
            (!data.city || data.city.trim() === "")
         ) {
            return false;
         }

         //NOTE: If manuallyEnterCity is false, city must not be empty
         if (
            !data.manuallyEnterCity &&
            (!data.city || data.city.trim() === "")
         ) {
            return false;
         }

         return true;
      },
      {
         message: "Please enter the location of your job",
         path: ["city"],
      }
   );

export const EditWorkExperience = ({
   initialEmployer,
   initialJobTitle,
   initialJobLevel,
   initialIndustry,
   initialJobFunction,
   initialWorkType,
   initialCountry,
   initialState,
   initialCity,
   initialManuallyEnterCity = false,
   initialStartDate,
   initialEndDate,
   initialCurrentJob = false,
   initialJobResponsibilities,
}: EditWorkExperienceProps) => {
   const {
      workExperience: {
         jobLevelOptions,
         jobIndustry,
         jobFunction,
         workType,
      },
   } = careerConstants;

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),

      // NOTE: We set the default value to the value passed, if pressent else
      defaultValues: {
         employer: initialEmployer,
         jobTitle: initialJobTitle,
         jobLevel: initialJobLevel,
         industry: initialIndustry,
         jobFunction: initialJobFunction,
         workType: initialWorkType,
         country: initialCountry,
         state: initialState,
         city: initialCity,
         manuallyEnterCity: initialManuallyEnterCity,
         startDate: initialStartDate,
         endDate: initialEndDate,
         currentJob: initialCurrentJob,
         jobResponsibilities: initialJobResponsibilities,
      },
   });

   // NOTE: The useGetCountryStateCityHook will need the below values
   const selectedCountry = form.watch("country");
   const selectedState = form.watch("state");
   const { countryData, stateData, cityData } = useCountryStateCityData(
      selectedCountry,
      selectedState
   );

   function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      console.log(values);
   }

   return (
      <AlertDialogContent className="px-0 sm:w-full sm:max-w-xl 800:max-w-screen-700 ">
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="max-h-[90dvh] h-full flex flex-col overflow-auto"
            >
               <AlertDialogHeader className="px-6 pb-2">
                  <AlertDialogTitle>Add Work Experience</AlertDialogTitle>
               </AlertDialogHeader>

               <ScrollArea>
                  <div className="mt- pb-2 px-6 flex-grow grid gap-5 sm:grid-cols-2">
                     <FormField
                        control={form.control}
                        name="employer"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Employer</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Employer Name"
                                    {...field}
                                 />
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
                        name="industry"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Industry</FormLabel>
                              <FormControl>
                                 <ComboBox
                                    array={jobIndustry}
                                    allowSearch
                                    placeholder="Please select a job industry"
                                    currentValue={field.value}
                                    onValueChange={(value) => {
                                       form.setValue("industry", value);
                                    }}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="jobFunction"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Job Function</FormLabel>
                              <FormControl>
                                 <ComboBox
                                    array={jobFunction}
                                    allowSearch
                                    placeholder="Please select a job function"
                                    currentValue={field.value}
                                    onValueChange={(value) => {
                                       form.setValue("jobFunction", value);
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
                                    placeholder="Please select a work type"
                                    currentValue={field.value}
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
                        name="country"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                 <ComboBox
                                    array={countryData}
                                    allowSearch
                                    placeholder="Please select job country"
                                    currentValue={field.value}
                                    onValueChange={(value) => {
                                       form.setValue("country", value);
                                    }}
                                 />
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
                                 <ComboBox
                                    array={stateData}
                                    allowSearch
                                    placeholder="Please select job state"
                                    currentValue={field.value}
                                    onValueChange={(value) => {
                                       form.setValue("state", value);
                                    }}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {/* NOTE: If 'manuallyEnterCity' is false, then we show select dropdown with the city else we show an input, incase the city isnt in the response from the api.  */}

                     {!form.watch("manuallyEnterCity") ? (
                        <FormField
                           control={form.control}
                           name="city"
                           render={({ field }) => (
                              <FormItem
                                 className={cn("sm:col-span-2", {
                                    "sm:col-span-1": form.watch("currentJob"), // If currentJob is true we want to reduce the span size
                                 })}
                              >
                                 <FormLabel className="flex items-center justify-between gap-3">
                                    City
                                    {/*NOTE: Manually enter city field */}
                                    <FormField
                                       control={form.control}
                                       name="city"
                                       render={({ field }) => (
                                          <FormItem className="flex  gap-2 *:!mt-0">
                                             <FormControl>
                                                <Checkbox
                                                   id="manuallyEnterCity"
                                                   checked={form.watch(
                                                      "manuallyEnterCity"
                                                   )}
                                                   onCheckedChange={(
                                                      value: boolean
                                                   ) => {
                                                      form.setValue(
                                                         "manuallyEnterCity",
                                                         value
                                                      );
                                                   }}
                                                />
                                             </FormControl>
                                             <FormLabel
                                                htmlFor="manuallyEnterCity"
                                                className="!text-foreground text-sm cursor-pointer"
                                             >
                                                Manually enter city
                                             </FormLabel>
                                          </FormItem>
                                       )}
                                    />
                                 </FormLabel>

                                 <FormControl>
                                    <ComboBox
                                       array={cityData}
                                       allowSearch
                                       placeholder="Please select job city"
                                       currentValue={field.value}
                                       onValueChange={(value) => {
                                          form.setValue("city", value);
                                       }}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     ) : (
                        <FormField
                           control={form.control}
                           name="city"
                           render={({ field }) => (
                              <FormItem
                                 className={cn("sm:col-span-2", {
                                    "sm:col-span-1": form.watch("currentJob"), // If currentJob is true we want to reduce the span size
                                 })}
                              >
                                 <FormLabel className="flex items-center justify-between gap-3">
                                    City
                                    {/*NOTE: Manually enter city field */}
                                    <FormField
                                       control={form.control}
                                       name="city"
                                       render={({ field }) => (
                                          <FormItem className="flex items-end gap-2 *:!mt-0">
                                             <FormControl>
                                                <Checkbox
                                                   id="manuallyEnterCity"
                                                   checked={form.watch(
                                                      "manuallyEnterCity"
                                                   )}
                                                   onCheckedChange={(
                                                      value: boolean
                                                   ) => {
                                                      form.setValue(
                                                         "manuallyEnterCity",
                                                         value
                                                      );
                                                   }}
                                                />
                                             </FormControl>
                                             <FormLabel
                                                htmlFor="manuallyEnterCity"
                                                className="!text-foreground text-sm cursor-pointer"
                                             >
                                                Manually enter city
                                             </FormLabel>
                                          </FormItem>
                                       )}
                                    />
                                 </FormLabel>

                                 <FormControl>
                                    <Input
                                       placeholder="Enter your city"
                                       {...field}
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     )}

                     <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Start Date</FormLabel>
                              <FormControl>
                                 <DatePicker
                                    onValueChange={(value: Date) => {
                                       const dateString = value.toDateString();

                                       form.setValue("startDate", dateString);
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
                                       onValueChange={(value: Date) => {
                                          const dateString =
                                             value.toDateString();

                                          form.setValue("endDate", dateString);
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
                           <FormItem className="flex items-center gap-2 *:!mt-0">
                              <FormControl>
                                 <Checkbox
                                    id="currentJob"
                                    className="size-5"
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
