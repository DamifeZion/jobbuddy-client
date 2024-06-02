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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { sharedConstants } from "@/constants/shared-const";
import { routeConstants } from "@/constants/route-const";
import { Textarea } from "@/components/ui/textarea";
import { careerConstants } from "@/constants/career-const";

const formSchema = z.object({
   professionalSummary: z
      .string()
      .min(150, {
         message: "Professional summary must be at least 150 characters long.",
      })
      .max(250, {
         message: "Professional summary must be at most 250 characters long.",
      }),
});

const ProfessionalSummary = () => {
   const { push } = useRouter();
   const { profile } = routeConstants.authRoute.nestedRoute;
   const { professionalSummaryDemoData: initialProfessionalSummary } =
      careerConstants;

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         professionalSummary: initialProfessionalSummary,
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      console.log(values);
   }

   return (
      <CareerProfileLayouts pageTitle="Professional Summary">
         <Card>
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardHeader>
                     <CardTitle>Add Professional Summary</CardTitle>
                     <CardDescription>
                        Your Professional Summary is a critical part of your
                        profile. It should provide a concise view of your career
                        history, skills, and aspirations. Include key
                        achievements, years of experience, and skills relevant
                        to your desired role. This summary will be a key
                        reference for your resume, so make it count!
                     </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col gap-4">
                     <FormField
                        control={form.control}
                        name="professionalSummary"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Professional Summary</FormLabel>
                              <FormControl>
                                 <Textarea placeholder="" rows={8} {...field} />
                              </FormControl>
                              <FormDescription>
                                 Your professional summary should be between 150
                                 and 250 characters.
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

export default ProfessionalSummary;
