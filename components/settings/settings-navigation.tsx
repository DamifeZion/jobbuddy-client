// "use client";
// import { isRouteActive } from "@/util/shared/isRouteActive-util";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Button } from "../ui/button";
// import { SettingsConstants } from "@/constants/settings-const";
// import { cn } from "@/lib/utils";

// export const SettingsNavigation = () => {
//    const pathname = usePathname();

//    console.log(pathname);

//    return (
//       <nav className="grid gap-2">
//          {SettingsConstants.navigations.map((data, index) => (
//             <Link key={index} href={data.href}>
//                <Button
//                   variant={
//                      isRouteActive(pathname, data.href, true)
//                         ? "secondary"
//                         : "link"
//                   }
//                   className="w-full justify-start text-primary-foreground"
//                >
//                   {data.title}
//                </Button>
//             </Link>
//          ))}
//       </nav>
//    );
// };
