import { cn } from "@/lib/utils";
import { OmniRoomProps } from "@/types";
import { useState, useEffect } from "react";

export const HeadRoom = ({
   children,
   hideDistance = 70,
   className,
}: OmniRoomProps) => {
   const [lastScrollTop, setLastScrollTop] = useState(0);
   const [isHidden, setIsHidden] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         const scrollTop = window.scrollY;

         // If scrolling down and past the threshold, hide the header
         if (scrollTop > lastScrollTop && scrollTop) {
            setIsHidden(true);
         }
         // If scrolling up, show the header
         else if (scrollTop < lastScrollTop) {
            setIsHidden(false);
         }

         setLastScrollTop(scrollTop);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [lastScrollTop]);

   return (
      <div
         style={{
            top: isHidden ? `-${hideDistance}px` : "0px",
            transition: "top 0.2s",
         }}
         className={cn(
            "w-full fixed transition-top ease-linear duration-300  bg-transparent",
            className,
            {
               hiddenHeadRoom: isHidden,
            }
         )}
      >
         {children}
      </div>
   );
};

export const FootRoom = ({
   children,
   hideDistance = 70,
   className,
}: OmniRoomProps) => {
   const [lastScrollTop, setLastScrollTop] = useState(0);
   const [isHidden, setIsHidden] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         const scrollTop = window.scrollY;

         // If scrolling down and past the threshold, hide the footer
         if (scrollTop > lastScrollTop && scrollTop) {
            setIsHidden(true);
         }
         // If scrolling up, show the footer
         else if (scrollTop < lastScrollTop) {
            setIsHidden(false);
         }

         setLastScrollTop(scrollTop);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [lastScrollTop]);

   return (
      <div
         style={{
            bottom: isHidden ? `-${hideDistance}px` : "0px",
            transition: "bottom 0.2s",
         }}
         className={cn(
            "w-full fixed transition-bottom ease-linear duration-300 bg-transparent",
            className,
            {
               hiddenFootRoom: isHidden,
            }
         )}
      >
         {children}
      </div>
   );
};

// Nautical terminology, where ‘Port’ means Left
export const PortRoom = ({
   children,
   hideDistance = 70,
   className,
}: OmniRoomProps) => {
   const [lastScrollLeft, setLastScrollLeft] = useState(0);
   const [isHidden, setIsHidden] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         const scrollLeft = window.scrollX;

         // If scrolling left and past the threshold, hide the side bar
         if (scrollLeft < lastScrollLeft && scrollLeft) {
            setIsHidden(true);
         } else {
            setIsHidden(false);
         }

         setLastScrollLeft(scrollLeft);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [lastScrollLeft]);

   return (
      <div
         style={{
            left: isHidden ? `-${hideDistance}px` : "0px",
            transition: "left 0.2s",
         }}
         className={cn(
            "fixed transition-left ease-linear duration-300 bg-transparent",
            className,
            {
               hiddenPortRoom: isHidden,
            }
         )}
      >
         {children}
      </div>
   );
};

// Nautical terminology, where ‘Starboard’ means Right
export const StarboardRoom = ({
   children,
   hideDistance = 70,
   className,
}: OmniRoomProps) => {
   const [lastScrollRight, setLastScrollRight] = useState(0);
   const [isHidden, setIsHidden] = useState(false);

   useEffect(() => {
      const handleScroll = () => {
         const scrollRight = window.scrollX;

         // If scrolling right and past the threshold, hide the side bar
         if (scrollRight > lastScrollRight && scrollRight) {
            setIsHidden(true);
         } else {
            setIsHidden(false);
         }

         setLastScrollRight(scrollRight);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, [lastScrollRight]);

   return (
      <div
         style={{
            right: isHidden ? `-${hideDistance}px` : "0px",
            transition: "right 0.2s",
         }}
         className={cn(
            "fixed transition-right ease-linear duration-300  bg-transparent",
            className,
            {
               hiddenStarboardRoom: isHidden,
            }
         )}
      >
         {children}
      </div>
   );
};
