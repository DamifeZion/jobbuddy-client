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
   FormDescription,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { navbarConstants } from "@/constants/navbar-const";
import { useTheme } from "next-themes";
import Link from "next/link";

//NOTE: Dynamic import below;
import dynamic from "next/dynamic";
import { routeConstants } from "@/constants/route-const";
const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

const formSchema = z
   .object({
      username: z.string().min(5, {
         message: "Enter your username",
      }),

      email: z.string().email({
         message: "Enter a valid email address",
      }),

      password: z
         .string()
         .refine(
            (password) =>
               /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/.test(
                  password
               ),
            {
               message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.",
            }
         ),

      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
   });

const Register = () => {
   const { resolvedTheme } = useTheme();
   const [showPassword, setShowPassword] = useState<boolean>(false);
   const [showConfirmPassword, setShowConfirmPassword] =
      useState<boolean>(false);
   const { unAuthRoute } = routeConstants;

   const renderEyeIcon = (formFieldToShow: boolean) => {
      switch (formFieldToShow) {
         case true:
            return <Eye />;

         default:
            return <EyeOff />;
      }
   };

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         username: "",
         email: "",
         password: "",
         confirmPassword: "",
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
                     <CardTitle className="text-2xl">Register</CardTitle>

                     <CardDescription>
                        Enter your information to create an account
                     </CardDescription>
                  </CardHeader>

                  <CardContent className="w-full grid gap-4">
                     <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Enter your username"
                                    {...field}
                                 />
                              </FormControl>
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
                                    type="email"
                                    placeholder="m@example.com"
                                    {...field}
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                 <div className="relative">
                                    <Input
                                       type={showPassword ? "text" : "password"}
                                       placeholder="Enter your password"
                                       className="pr-8"
                                       {...field}
                                    />

                                    <Button
                                       type="button"
                                       variant="ghost"
                                       size="icon"
                                       className="size-7 absolute top-1/2 -translate-y-1/2 right-1 *:size-4"
                                       onClick={() =>
                                          setShowPassword((prev) => !prev)
                                       }
                                    >
                                       {renderEyeIcon(showPassword)}
                                    </Button>
                                 </div>
                              </FormControl>

                              {/* NOTE: If there is no error we show the form descriptoion else we show the form error. They are basically the same messages with different colors. This just makes it easier */}
                              {!form.formState.errors.password && (
                                 <FormDescription>
                                    Password must be at least one uppercase
                                    letter, one lowercase letter, one number,
                                    one special character, and be at least 8
                                    characters long.
                                 </FormDescription>
                              )}
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
                                       type={
                                          showConfirmPassword
                                             ? "text"
                                             : "password"
                                       }
                                       placeholder="Confirm your password"
                                       className="pr-8"
                                       {...field}
                                    />

                                    <Button
                                       type="button"
                                       variant="ghost"
                                       size="icon"
                                       className="size-7 absolute top-1/2 -translate-y-1/2 right-1 *:size-4"
                                       onClick={() =>
                                          setShowConfirmPassword(
                                             (prev) => !prev
                                          )
                                       }
                                    >
                                       {renderEyeIcon(showConfirmPassword)}
                                    </Button>
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </CardContent>

                  <CardFooter className="flex-col gap-4">
                     <Button type="submit" className="w-full">
                        Create an account
                     </Button>

                     <Button type="button" variant="outline" className="w-full">
                        Register with Google
                     </Button>

                     <div className="text-center text-sm">
                        Already have an account?{" "}
                        <Link href={unAuthRoute.login} className="underline">
                           Login
                        </Link>
                     </div>
                  </CardFooter>
               </Card>
            </form>
         </Form>
      </section>
   );
};

export default Register;
