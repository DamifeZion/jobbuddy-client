import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ReduxProvider from "@/services/Provider";
import ToastProvider from "@/services/ToastProvider";
import "./globals.css";

const roboto = Roboto({
   weight: "400",
   subsets: ["latin"],
   variable: "--font-roboto",
});

export const metadata: Metadata = {
   title: "Job Buddy",
   description: "Generated by create next app",
};

export default function RootLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body
            className={cn(roboto.className, {
               // "debug-screens": process.env.NODE_ENV === "development",
            })}
         >
            <ReduxProvider>
               <ToastProvider />
               {children}
            </ReduxProvider>
         </body>
      </html>
   );
}
