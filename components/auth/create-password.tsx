"use client";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { navbarConstants } from "@/constants/navbar-const";
import { useTheme } from "next-themes";

//NOTE: Dynamic import below;
import dynamic from "next/dynamic";
const DynamicImage = dynamic(() => import("next/image"), { ssr: false });


const formSchema = z
   .object({
      password: z.string().refine(password => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/.test(password), {
         message: "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.",
      }),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
   });


export const CreatePasswordForm = () => {
   const { resolvedTheme } = useTheme();
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

   const renderEyeIcon = (formFieldToShow: boolean) => {
      switch (formFieldToShow) {
         case true:
            return <Eye />

         default:
            return <EyeOff />
      }
   }

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         password: "",
         confirmPassword: "",
      },
   })

   function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      console.log(values)
   }

   return (
      <section className="w-full py-2 min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
         <DynamicImage
            src={resolvedTheme === "dark" ? navbarConstants.logo.dark : navbarConstants.logo.light}
            alt=""
            width={150}
            height={150}
            priority
         />

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <Card className="mx-auto w-full max-w-sm">
                  <CardHeader>
                     <CardTitle className="text-2xl">Create password</CardTitle>

                     <CardDescription>
                        Set a new password for your account
                     </CardDescription>
                  </CardHeader>

                  <CardContent className="w-full grid gap-4">
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       type={showPassword ? 'text' : 'password'}
                                       placeholder="Enter your password"
                                       className="pr-8"
                                       {...field}
                                    />

                                    <Button
                                       type="button"
                                       variant="ghost"
                                       size="icon"
                                       className="size-7 absolute top-1/2 -translate-y-1/2 right-1 *:size-4"
                                       onClick={() => setShowPassword(prev => !prev)}
                                    >
                                       {renderEyeIcon(showPassword)}
                                    </Button>
                                 </div>
                              </FormControl>

                              {/* NOTE: If there is no error we show the form descriptoion else we show the form error. They are basically the same messages with different colors. This just makes it easier */}
                              {!form.formState.errors.password &&
                                 <FormDescription>
                                    Password must be at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.
                                 </FormDescription>
                              }
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       type={showConfirmPassword ? 'text' : 'password'}
                                       placeholder="Confirm your password"
                                       className="pr-8"
                                       {...field}
                                    />


                                    <Button
                                       type="button"
                                       variant="ghost"
                                       size="icon"
                                       className="size-7 absolute top-1/2 -translate-y-1/2 right-1 *:size-4"
                                       onClick={() => setShowConfirmPassword(prev => !prev)}
                                    >
                                       {renderEyeIcon(showConfirmPassword)}
                                    </Button>
                                 </div>
                              </FormControl>
                              <FormDescription>

                              </FormDescription>
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
   )
}