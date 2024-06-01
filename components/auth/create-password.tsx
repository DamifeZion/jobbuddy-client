"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
export function CreatePasswordForm() {
   const [password, setPassword] = useState<boolean>(false);
   const handlePassword = () => {
      setPassword(!password);
   };

   const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
   const handleConfirmPassword = () => {
      setConfirmPassword(!confirmPassword);
   };
   const formSchema = z
      .object({
         password: z.string().min(8),
         confirmPassword: z.string().min(8),
      })
      .refine((data) => data.password === data.confirmPassword, {
         message: "password do not match",
         path: ["confirmPassword"],
      });

   const { handleSubmit, register, formState, reset, watch, setValue } =
      useForm<z.infer<typeof formSchema>>({
         resolver: zodResolver(formSchema),
         defaultValues: {
            password: "",
            confirmPassword: "",
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
            <Card className="mx-auto min-w-sm h-full">
               <CardHeader>
                  <CardTitle className="text-2xl">Create password</CardTitle>
                  <CardDescription>
                     Set a new password for your account
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="grid gap-4">
                     <div className="grid gap-2 relative">
                        <div className="flex items-center">
                           <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                           id="password"
                           type={password ? "text" : "password"}
                           required
                           className="w-[300px]"
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
                     <div className="grid gap-2 relative">
                        <div className="flex items-center">
                           <Label htmlFor="password">Confirm password</Label>
                        </div>
                        <Input
                           id="password"
                           type={confirmPassword ? "text" : "password"}
                           required
                           className="w-[300px]"
                           {...register("confirmPassword")}
                        />
                        <span
                           onClick={handleConfirmPassword}
                           className="absolute top-[50%] right-4"
                        >
                           {confirmPassword ? (
                              <Eye color="#6D6D6D" className="cursor-pointer" />
                           ) : (
                              <EyeOff
                                 color="#6D6D6D"
                                 className="cursor-pointer"
                              />
                           )}
                        </span>
                        {errors.confirmPassword && (
                           <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                              {errors.confirmPassword?.message}
                           </div>
                        )}
                     </div>
                     <Button type="submit" className="w-full">
                        Submit
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </form>
      </section>
   );
}
