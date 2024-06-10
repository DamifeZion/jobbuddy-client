"use client";

import { Button } from "@/components/ui/button";
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
   InputOTPSeparator,
} from "@/components/ui/input-otp";
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
   FormField,
   FormItem,
   FormMessage,
   FormDescription,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { navbarConstants } from "@/constants/navbar-const";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

//NOTE: Dynamic import below;
import dynamic from "next/dynamic";
import { routeConstants } from "@/constants/route-const";
import { toast } from "sonner";
import { useEmailVerificationMutation } from "@/services/api/authApi/authApi";
import { useEffect } from "react";
import { LoadingIcon } from "@/components/shared/loading-icon";
const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

// NOTE: We dont need to pattern test the password for the login page.
const formSchema = z.object({
   code: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
   }),
});

const VerificationCode = () => {
   const { resolvedTheme } = useTheme();
   const { unAuthRoute } = routeConstants;

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         code: "",
      },
   });
   const { push } = useRouter();
   //Endpoint call
   const [emailVerification, { data, isLoading, error, isSuccess }] =
      useEmailVerificationMutation();
   useEffect(() => {
      console.log("data:", data);
      if (isSuccess) {
         toast.success(data?.result || "Account verify successfully");
         push("/login");
      }
      if (error) {
         toast.error(data?.result || data?.serverError);
      }
   }, [data, data?.result, data?.serverError, isSuccess]);
   const onSubmit = (values: z.infer<typeof formSchema>) => {
      // Do something with the form values.
      const { code } = values;
      const verificationCode = code;
      emailVerification({ verificationCode });
   };

   return (
      <section className="w-full py-4 min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
         <Link href={unAuthRoute.main}>
            <DynamicImage
               src={
                  resolvedTheme === "dark"
                     ? navbarConstants.logo.dark
                     : navbarConstants.logo.light
               }
               alt=""
               width={170}
               height={170}
               priority
            />
         </Link>

         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="mx-auto w-full max-w-sm"
            >
               <Card className="max-400:shadow-none max-400:border-transparent">
                  <CardHeader>
                     <CardTitle className="text-2xl">
                        Verification code
                     </CardTitle>

                     <CardDescription>
                        Enter the verification code sent to {"useremail.com"}.
                     </CardDescription>
                  </CardHeader>

                  <CardContent>
                     <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                           <FormItem>
                              <FormControl>
                                 <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                       <InputOTPSlot index={0} />
                                       <InputOTPSlot index={1} />
                                       <InputOTPSlot index={2} />
                                    </InputOTPGroup>

                                    <InputOTPSeparator />

                                    <InputOTPGroup>
                                       <InputOTPSlot index={3} />
                                       <InputOTPSlot index={4} />
                                       <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                 </InputOTP>
                              </FormControl>

                              <FormDescription>
                                 Please enter the one-time password sent to your
                                 phone.
                              </FormDescription>

                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </CardContent>

                  <CardFooter>
                     {isLoading ? (
                        <Button
                           disabled={isLoading}
                           type="submit"
                           className="w-full"
                        >
                           <span className="flex items-center gap-2">
                              <LoadingIcon />
                              Submitting
                           </span>{" "}
                        </Button>
                     ) : (
                        <Button type="submit" className="w-full">
                           Submit
                        </Button>
                     )}
                  </CardFooter>
               </Card>
            </form>
         </Form>
      </section>
   );
};

export default VerificationCode;
