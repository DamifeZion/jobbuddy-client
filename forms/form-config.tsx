"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { LoadingIconProps } from "@/types";
import { cn } from "@/lib/utils";

const LoadingIcon = ({ className, ...props }: LoadingIconProps) => {
   return (
      <ReloadIcon
         className={cn("size-4 mr-2 animate-spin", className)}
         {...props}
      />
   );
};

export {
   z,
   zodResolver,
   useForm,
   Button,
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   Input,
   Textarea,
   toast,
   LoadingIcon,
};
