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

const Experiences = () => {
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
      <CareerProfileLayouts pageTitle="Work Experience">
         <Card>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardHeader>
                     <CardTitle>Work Experience</CardTitle>
                     <CardDescription></CardDescription>
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
                  </CardContent>

                  <CardFooter className="justify-between">
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

export default Experiences;
