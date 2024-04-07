import { CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { MyCarouselDirectionProps } from "@/types";
import { cn } from "@/lib/utils";

export const MyCarouselPrevious = ({
   className,
   ...props
}: MyCarouselDirectionProps) => {
   return (
      <CarouselPrevious
         hideWhenNoScroll={true}
         {...props}
         className={cn("z-10", className)}
      />
   );
};

export const MyCarouselNext = ({
   className,
   ...props
}: MyCarouselDirectionProps) => {
   return (
      <CarouselNext
         hideWhenNoScroll={true}
         {...props}
         className={cn("z-10", className)}
      />
   );
};
