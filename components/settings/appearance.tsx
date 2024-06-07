import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const SettingsAppearance = () => {
   const { setTheme, resolvedTheme } = useTheme();

   return (
      <div className="grid gap-6 min-[350px]:grid-cols-2 min-[490px]:grid-cols-[200px_200px]">
         {/* NOTE: Light Theme */}
         <div id="light-theme" onClick={() => setTheme("light")}>
            <div
               className={cn(
                  "rounded-sm border-2 border-transparent transition-all ease-linear duration-100",
                  {
                     "border-2 border-primary": resolvedTheme === "light",
                  }
               )}
            >
               <div className="p-1 items-center rounded-md border-2 border-muted hover:border-accent">
                  <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                     <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                        <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                     </div>
                     <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                     </div>
                     <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                        <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                        <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                     </div>
                  </div>
               </div>
            </div>

            <span className="block w-full p-2 text-center font-normal">
               Light
            </span>
         </div>

         {/* NOTE: Dark Theme */}
         <div onClick={() => setTheme("dark")}>
            <div
               className={cn(
                  "rounded-sm border-2 border-transparent transition-all ease-linear duration-100",
                  {
                     "border-primary": resolvedTheme === "dark",
                  }
               )}
            >
               <div className="p-1 items-center rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground">
                  <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                     <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                        <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                     </div>
                     <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                        <div className="h-4 w-4 rounded-full bg-slate-400" />
                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                     </div>
                     <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                        <div className="h-4 w-4 rounded-full bg-slate-400" />
                        <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                     </div>
                  </div>
               </div>
            </div>

            <span className="block w-full p-2 text-center font-normal">
               Dark
            </span>
         </div>
      </div>
   );
};
