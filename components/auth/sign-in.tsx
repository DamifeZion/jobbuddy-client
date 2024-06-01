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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
   const [password, setPassword] = useState(false);
   const handlePassword = () => {
      setPassword(!password);
   };
   const formSchema = z.object({
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
         },
      });

   const { errors } = formState;
   const onSubmit = (values: z.infer<typeof formSchema>) => {
      console.log(values);
   };
   return (
      <section className="flex flex-col items-center bg-background justify-center w-full h-screen">
         <Image
            src="/site-logo.png"
            width={300}
            height={100}
            alt="logo"
            className=" object-contain pb-5"
         />
         <form onSubmit={handleSubmit(onSubmit)}>
            <Card className="mx-auto max-w-sm h-full">
               <CardHeader>
                  <CardTitle className="text-2xl">Login</CardTitle>
                  <CardDescription>
                     Enter your email below to login to your account
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="grid gap-4">
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
                        <div className="flex items-center">
                           <Label htmlFor="password">Password</Label>
                           <Link
                              href="#"
                              className="ml-auto inline-block text-sm underline"
                           >
                              Forgot your password?
                           </Link>
                        </div>
                        <Input
                           id="password"
                           type={password ? "text" : "password"}
                           required
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
                        Login
                     </Button>
                     <Button variant="outline" className="w-full">
                        Login with Google
                     </Button>
                  </div>
                  <div className="mt-4 text-center text-sm">
                     Don&apos;t have an account?{" "}
                     <Link href="#" className="underline">
                        Sign up
                     </Link>
                  </div>
               </CardContent>
            </Card>
         </form>
      </section>
   );
}
