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
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function ForgetPasswordForm() {
   const formSchema = z.object({
      email: z.string().email({
         message: "Enter your email address",
      }),
   });
   const { handleSubmit, register, formState, reset, watch, setValue } =
      useForm<z.infer<typeof formSchema>>({
         resolver: zodResolver(formSchema),
         defaultValues: {
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
            <Card className="w-full max-w-sm h-full">
               <CardHeader>
                  <CardTitle className="text-2xl">Forgot password</CardTitle>
                  <CardDescription>Enter your email below.</CardDescription>
               </CardHeader>
               <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                     <Label htmlFor="email">Email</Label>
                     <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        className="w-[300px]"
                        {...register("email")}
                     />
                     {errors.email && (
                        <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
                           {errors.email?.message}
                        </div>
                     )}
                  </div>
               </CardContent>
               <CardFooter>
                  <Button type="submit" className="w-full">
                     Submit
                  </Button>
               </CardFooter>
            </Card>
         </form>
      </section>
   );
}
