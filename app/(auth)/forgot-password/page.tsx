"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { navbarConstants } from "@/constants/navbar-const";
import { useTheme } from "next-themes";
import Link from "next/link";
import { LoadingIcon } from "@/components/shared/loading-icon";

//NOTE: Dynamic import below;
import dynamic from "next/dynamic";
import { routeConstants } from "@/constants/route-const";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "@/services/api/authApi/authApi";
const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

const formSchema = z.object({
   usernameOrEmail: z.string().min(5, {
      message: "Please enter a valid email address or username",
   }),
});

const ForgotPassword = () => {
   const { resolvedTheme } = useTheme();
   const { unAuthRoute } = routeConstants;

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         usernameOrEmail: "",
      },
   });

   //Endpoint call
   const [userForgotPassword, { data, isLoading, error, isSuccess }] =
      useForgotPasswordMutation();
   useEffect(() => {
      console.log("data:", data);
      if (isSuccess) {
         toast.success(data?.data || "Check your email for a link");
      }
      if (error) {
         toast.error(data?.serverError || data?.data);
      }
   }, [data, data?.data, data?.serverError, isSuccess]);

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      // Do something with the form values.
      userForgotPassword(values);
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
                     <CardTitle className="text-2xl">Forgot password</CardTitle>

                     <CardDescription>
                        Enter your account email below.
                     </CardDescription>
                  </CardHeader>

                  <CardContent className="w-full grid gap-4">
                     <FormField
                        control={form.control}
                        name="usernameOrEmail"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Enter your account email or username"
                                    {...field}
                                 />
                              </FormControl>
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

export default ForgotPassword;
