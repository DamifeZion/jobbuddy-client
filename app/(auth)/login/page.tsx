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
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { navbarConstants } from "@/constants/navbar-const";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import Link from "next/link";

//NOTE: Dynamic import below;
import dynamic from "next/dynamic";
import { routeConstants } from "@/constants/route-const";
import { toast } from "sonner";
import { useSignInMutation } from "@/services/api/authApi/authApi";
const DynamicImage = dynamic(() => import("next/image"), { ssr: false });

// NOTE: We dont need to pattern test the password for the login page.
const formSchema = z.object({
   usernameOrEmail: z.string().email({
      message: "Enter a valid email address",
   }),

   password: z.string().min(3, {
      message: "Enter your password",
   }),
});

const Login = () => {
   const { resolvedTheme } = useTheme();
   const [showPassword, setShowPassword] = useState<boolean>(false);
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
         password: "",
         usernameOrEmail: "",
      },
   });

   const { push } = useRouter();

   //Endpoint call
   const [userLogin, { data, isLoading, error, isSuccess }] =
      useSignInMutation();
   useEffect(() => {
      console.log("data:", data);
      if (isSuccess) {
         toast.success(data?.data?.message || "Login successfully");
         push("/");
      }
      if (error) {
         toast.error(data?.serverError || data?.data);
      }
   }, [data, data?.data, data?.serverError, isSuccess]);

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      // Do something with the form values.
      userLogin(values);
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
                     <CardTitle className="text-2xl">Login</CardTitle>

                     <CardDescription>
                        Enter your email below to login to your account
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
                              <FormLabel className="flex justify-between">
                                 <span>Password</span>

                                 <Link
                                    href={unAuthRoute.forgotPassword}
                                    className="text-sm underline"
                                 >
                                    Forgot your password?
                                 </Link>
                              </FormLabel>

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

                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </CardContent>

                  <CardFooter className="flex-col gap-4">
                     {isLoading ? (
                        <Button
                           disabled={isLoading}
                           type="submit"
                           className="w-full"
                        >
                           <span className="flex items-center gap-2">
                              <LoadingIcon />
                              Logging
                           </span>{" "}
                        </Button>
                     ) : (
                        <Button type="submit" className="w-full">
                           Login
                        </Button>
                     )}

                     <Button type="button" variant="outline" className="w-full">
                        Login with Google
                     </Button>

                     <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href={unAuthRoute.register} className="underline">
                           Register
                        </Link>
                     </div>
                  </CardFooter>
               </Card>
            </form>
         </Form>
      </section>
   );
};

export default Login;
