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
import { StoreRootState } from "@/services/redux-provider/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { sharedConstants } from "@/constants/shared-const";
import { routeConstants } from "@/constants/route-const";

const formSchema = z.object({
   fullname: z.string().min(2, {
      message: "Fullname must be at least 2 characters.",
   }),

   email: z.string().email({
      message: "Please enter a valid email address.",
   }),

   phone: z.string().min(10, {
      message: "Phone is required",
   }),

   linkedIn: z.string(),

   website: z.string(),

   location: z.string().min(5, {
      message: "Location must be at least 5 characters",
   }),

   professionalTitle: z.string().min(5, {
      message: "Professional Title must be at least 5 characters",
   }),
});

const PersonalInformation = () => {
   const { push } = useRouter();
   const { user } = useSelector((state: StoreRootState) => state.userSlice);
   const { profile } = routeConstants.authRoute.nestedRoute;

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         fullname: user?.name,
         email: user?.email,
         phone: "",
         location: "",
         linkedIn: "",
         website: "",
         professionalTitle: "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      console.log(values);
   }

   return (
      <CareerProfileLayouts pageTitle="Personal Information">
         <Card>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardHeader>
                     <CardTitle>Add Personal Information</CardTitle>
                     <CardDescription>
                        The Personal Information section is the first part of
                        your resume or career profile. It provides essential
                        contact and identification information about you to
                        potential employers.
                     </CardDescription>
                  </CardHeader>

                  <CardContent className="grid gap-5 sm:gap-x-8 sm:grid-cols-2 lg:gap-x-12">
                     <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Fullname</FormLabel>
                              <FormControl>
                                 <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormDescription>
                                 Your first and last name. This is how employers
                                 will identify you.
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="john.doe@example.com"
                                    {...field}
                                 />
                              </FormControl>
                              <FormDescription>
                                 Your professional email address. Employers may
                                 use this to contact you
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/*NOTE: [Important] in the globals.css */}
                     <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                 <PhoneInput
                                    country={"ng"}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder=""
                                    containerClass={
                                       "rounded-md [&_.form-control]:!w-full [&_.form-control]:!z-10 [&_.form-control]:!rounded-md [&_.form-control]:!bg-background [&_.form-control]:!border-border [&_.flag-dropdown]:!w-full [&_.flag-dropdown]:!border-transparent [&_.selected-flag]:!rounded-l-md [&_.selected-flag]:!z-10 [&_.selected-flag] [&_.flag-dropdown]:!bg-transparent [&_.selected-flag]:!border-border [&_.country-list]:!w-[inherit] [&_.country-list]:!static [&_.country-list]:!bg-background [&_.dial-code]:!text-muted-foreground [&_.highlight]:!bg-secondary"
                                    }
                                 />
                              </FormControl>
                              <FormDescription>
                                 Your contact number. It’s often used by
                                 employers for quick communication or to set up
                                 interviews.
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="City, Country"
                                    {...field}
                                 />
                              </FormControl>
                              <FormDescription>
                                 Your current city and country. This gives
                                 employers an idea of your location and time
                                 zone.
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="professionalTitle"
                        render={({ field }) => (
                           <FormItem className="col-span-2">
                              <FormLabel>Professional Title</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Software Engineer"
                                    {...field}
                                 />
                              </FormControl>
                              <FormDescription>
                                 A brief professional title or tagline that
                                 describes the your job or career field.
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="linkedIn"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>LinkedIn (Optional)</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="https://linkedin.com/in/username"
                                    {...field}
                                 />
                              </FormControl>
                              <FormDescription>
                                 Your LinkedIn profile URL. If you have one, it
                                 can provide employers with more information
                                 about your professional experiences.
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Website (Optional)</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="https://yourwebsite.com"
                                    {...field}
                                 />
                              </FormControl>
                              <FormDescription>
                                 If you have a personal website or a portfolio
                                 online, this can be a great place to showcase
                                 your work.
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </CardContent>

                  <CardFooter className="justify-end gap-4">
                     <Button
                        variant="destructive"
                        type="button"
                        onClick={() => push(profile)}
                     >
                        Cancel
                     </Button>

                     <Button>Save</Button>
                  </CardFooter>
               </form>
            </Form>
         </Card>
      </CareerProfileLayouts>
   );
};

export default PersonalInformation;
