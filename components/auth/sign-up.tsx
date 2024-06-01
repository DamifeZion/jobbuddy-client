"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function SignUpForm() {
   const [password, setPassword] = useState<boolean>(false);
   const handlePassword = () => {
      setPassword(!password);
   };
   const formSchema = z.object({
      firstName: z.string().min(5, {
         message: "Enter your first name",
      }),
      lastName: z.string().min(5, {
         message: "Enter your last name",
      }),
      password: z.string().min(5, {
         message: "Enter your password",
      }),

      email: z.string().email({
         message: "Enter your email address",
      }),
   });
   const { handleSubmit, register, formState, reset, watch, setValue } =
      useForm<z.infer<typeof formSchema>>({
         resolver: zodResolver(formSchema),
         defaultValues: {
            password: "",
            email: "",
            firstName: "",
            lastName: "",
         },
      });

   const { errors } = formState;

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      console.log(values);
   };

   return (
      <section className="flex flex-col items-center justify-center w-full h-screen bg-background">
         <Image
            src="/site-logo.png"
            width={300}
            height={100}
            alt="logo"
            className=" object-contain pb-5"
         />
         <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mx-auto max-w-sm">
               <CardHeader>
                  <CardTitle className="text-xl">Sign Up</CardTitle>
                  <CardDescription>
                     Enter your information to create an account
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="grid gap-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                           <Label htmlFor="first-name">First name</Label>
                           <Input
                              id="first-name"
                              placeholder="Max"
                              required
                              {...register("firstName")}
                           />
                           {errors.firstName && (
                              <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                                 {errors.firstName?.message}
                              </div>
                           )}
                        </div>
                        <div className="grid gap-2">
                           <Label htmlFor="last-name">Last name</Label>
                           <Input
                              id="last-name"
                              placeholder="Robinson"
                              required
                              {...register("lastName")}
                           />
                           {errors.lastName && (
                              <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                                 {errors.lastName?.message}
                              </div>
                           )}
                        </div>
                     </div>
                     <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                           id="email"
                           type="email"
                           placeholder="m@example.com"
                           required
                           {...register("email")}
                        />
                        {errors.email && (
                           <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                              {errors.email?.message}
                           </div>
                        )}
                     </div>
                     <div className="grid gap-2 relative">
                        <Label htmlFor="password">Password</Label>
                        <Input
                           id="password"
                           type={password ? "text" : "password"}
                           {...register("password")}
                        />
                        <span
                           onClick={handlePassword}
                           className="absolute top-[50%] right-4"
                        >
                           {password ? (
                              <Eye color="#6D6D6D" className="cursor-pointer" />
                           ) : (
                              <EyeOff
                                 color="#6D6D6D"
                                 className="cursor-pointer"
                              />
                           )}
                        </span>
                        {errors.password && (
                           <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                              {errors.password?.message}
                           </div>
                        )}
                     </div>
                     <Button type="submit" className="w-full">
                        Create an account
                     </Button>
                     <Button variant="outline" className="w-full">
                        Sign up with Google
                     </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                     Already have an account?{" "}
                     <Link href="#" className="underline">
                        Sign in
                     </Link>
                  </div>
               </CardContent>
            </Card>
         </form>
      </section>
   );
}
