// "use client";
// import { Button } from "@/components/ui/button";
// import {
//    Card,
//    CardContent,
//    CardDescription,
//    CardFooter,
//    CardHeader,
//    CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Image from "next/image";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import {
//    InputOTP,
//    InputOTPGroup,
//    InputOTPSeparator,
//    InputOTPSlot,
// } from "@/components/ui/input-otp";

// export function CreatePasswordForm() {
//    const formSchema = z.object({
//       otp: z.string().min(6, {
//          message: "Enter your otp pin",
//       }),
//    });
//    const { handleSubmit, register, formState, reset, watch, setValue } =
//       useForm<z.infer<typeof formSchema>>({
//          resolver: zodResolver(formSchema),
//          defaultValues: {
//             otp: "",
//          },
//       });

//    const { errors } = formState;

//    const onSubmit = (values: z.infer<typeof formSchema>) => {
//       console.log(values);
//    };
//    return (
//       <section className="flex flex-col items-center bg-background justify-center w-full h-screen">
//          <Image
//             src="/site-logo.png"
//             width={300}
//             height={100}
//             alt="logo"
//             className=" object-contain pb-5"
//          />
//          <form onSubmit={handleSubmit(onSubmit)}>
//             <Card className="w-full max-w-sm h-full">
//                <CardHeader>
//                   <CardTitle className="text-2xl">Verification code</CardTitle>
//                   <CardDescription>
//                      Enter the verification code sent to john doe.
//                   </CardDescription>
//                </CardHeader>
//                <CardContent className="grid gap-4">
//                   <div className="grid gap-2">
//                      <Label htmlFor="email">Email</Label>
//                      <InputOTP maxLength={6}>
//                         <InputOTPGroup>
//                            <InputOTPSlot index={0} />
//                            <InputOTPSlot index={1} />
//                            <InputOTPSlot index={2} />
//                         </InputOTPGroup>
//                         <InputOTPSeparator />
//                         <InputOTPGroup>
//                            <InputOTPSlot index={3} />
//                            <InputOTPSlot index={4} />
//                            <InputOTPSlot index={5} />
//                         </InputOTPGroup>
//                      </InputOTP>
//                      {errors.otp && (
//                         <div className="text-red-500 max-w-[400px] text-sm font-normal pt-3">
//                            {errors.otp?.message}
//                         </div>
//                      )}
//                   </div>
//                </CardContent>
//                <CardFooter>
//                   <Button type="submit" className="w-full">
//                      Submit
//                   </Button>
//                </CardFooter>
//             </Card>
//          </form>
//       </section>
//    );
// }
