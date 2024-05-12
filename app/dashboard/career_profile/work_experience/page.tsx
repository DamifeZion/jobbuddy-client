"use client";
import { CareerProfileLayouts } from "@/components/career_profile/career-profile-layout";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StoreRootState } from "@/services/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import { useRouter } from "next/navigation";
import "react-phone-input-2/lib/style.css";
import { routeConstants } from "@/constants/route-const";
import { careerConstants } from "@/constants/career-const";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogContent,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
   AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const Experiences = () => {
   const { push } = useRouter();
   const [isCurrentJob, setIsCurrentJob] = useState(false);
   const { profile } = routeConstants.authRoute.nestedRoute;
   const { workExperience } = careerConstants;

   const formSchema = z.object({
      employer: z.string().min(5, {
         message: "Please add the name of your employer",
      }),

      jobTitle: z.string().min(5, {
         message: "Please enter your job title",
      }),

      jobLevel: z.string().min(5, {
         message: "Please enter your job level",
      }),

      country: z.string().min(5, {
         message: "Please enter the location of your job",
      }),

      industry: z.string().min(5, {
         message: "Please select an industry",
      }),

      jobFunction: z.string().min(5, {
         message: "Please select a Job function",
      }),

      monthlySalary: z.string(),

      workType: z.string().min(5, {
         message: "Please select work type",
      }),

      city: z.string().min(5, {
         message: "Please enter the location of your job",
      }),

      startDate: z.string().min(5, {
         message: "Please select start date",
      }),

      endDate: z
         .string()
         .min(5, {
            message: "Please select start date",
         })
         .optional(),

      currentJob: z.boolean(),

      jobResponsibilities: z.string().min(50, {
         message:
            "Please enter your job tasks and responsibilities. Minimum of 50 words",
      }),
   });

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         employer: "",
         jobTitle: "",
         jobLevel: "",
         country: "",
         industry: "",
         jobFunction: "",
         monthlySalary: "",
         workType: "",
         city: "",
         startDate: "",
         endDate: "",
         currentJob: false,
         jobResponsibilities: "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      console.log(values);
   }

   return (
      <CareerProfileLayouts pageTitle="Work Experience">
         <Card>
            <CardHeader>
               <CardTitle>Work Experience</CardTitle>
               <CardDescription>
                  Add your Work Experience. Such as an internship, part-time
                  work or long term specialised experience.
               </CardDescription>
            </CardHeader>

            <CardContent>
               {workExperience.length > 0 ? (
                  <p>Show the form content here.</p>
               ) : (
                  <h1 className="font-semibold">No Experience</h1>
               )}
            </CardContent>

            <AlertDialog>
               <CardFooter className="justify-end gap-10">
                  <Button
                     variant="destructive"
                     type="button"
                     onClick={() => push(profile)}
                  >
                     Cancel
                  </Button>

                  <AlertDialogTrigger asChild>
                     <Button type="button">Add</Button>
                  </AlertDialogTrigger>
               </CardFooter>

               <AlertDialogContent className="max-h-[95dvh] border-2 border-green-600 sm:w-full sm:max-w-xl 800:max-w-3xl ">
                  <Form {...form}>
                     <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="border border-purple-600 max-h-[inherit] h-full flex flex-col"
                     >
                        <AlertDialogHeader className="border border-blue-600">
                           <AlertDialogTitle>
                              Add Work Experience
                           </AlertDialogTitle>
                        </AlertDialogHeader>

                        <ScrollArea className="mt-5 flex-grow grid gap-5 border border-red-600 ">
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
                                       <Input
                                          placeholder="Job Title"
                                          {...field}
                                       />
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
                                       <Input
                                          placeholder="Job Title"
                                          {...field}
                                       />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                           {/* NOTE: Add end date field if 'currentJob' is true */}
                           {form.watch("currentJob") && (
                              <FormField
                                 control={form.control}
                                 name="endDate"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel>End Date</FormLabel>
                                       <FormControl>
                                          <Input
                                             placeholder="End Date"
                                             {...field}
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           )}
                        </ScrollArea>

                        <AlertDialogFooter className="border border-green-600">
                           <AlertDialogAction>Save</AlertDialogAction>

                           <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                     </form>
                  </Form>
               </AlertDialogContent>
            </AlertDialog>
         </Card>
      </CareerProfileLayouts>
   );
};

export default Experiences;
