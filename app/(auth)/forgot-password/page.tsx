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
import { useState } from "react";
import { navbarConstants } from "@/constants/navbar-const";
import { useTheme } from "next-themes";
import Link from "next/link";

//NOTE: Dynamic import below;
import dynamic from "next/dynamic";
import { routeConstants } from "@/constants/route-const";
const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

const formSchema = z.object({
   email: z.string().email({
      message: "Please enter a valid email address",
   }),
});

const ForgotPassword = () => {
   const { resolvedTheme } = useTheme();
   const { unAuthRoute } = routeConstants;

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
      },
   });

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      // Do something with the form values.
      console.log(values);
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
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input
                                    type="email"
                                    placeholder="Enter your account email"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </CardContent>

                  <CardFooter>
                     <Button type="submit" className="w-full">
                        Submit
                     </Button>
                  </CardFooter>
               </Card>
            </form>
         </Form>
      </section>
   );
};

export default ForgotPassword;
