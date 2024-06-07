"use client";

import { SettingsAppearance } from "@/components/settings/appearance";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Settings = () => {
   return (
      <DashboardLayout pageTitle="Settings">
         <div className="pb-4 border-b">
            <h1 className="max-lg:hidden text-3xl font-semibold md:text-4xl">
               Settings
            </h1>
            <p className="mt-1 text-muted-foreground">
               Manage your account settings and set e-mail preferences.
            </p>
         </div>

         <div className="mt-4 flex flex-col [&_#card_*]:px-0">
            <Card className="border-none">
               <CardHeader>
                  <CardTitle>Theme</CardTitle>
                  <CardDescription>
                     Select the theme for the dashboard.
                  </CardDescription>
               </CardHeader>

               <CardContent>
                  <SettingsAppearance />
               </CardContent>
            </Card>
         </div>
      </DashboardLayout>
   );
};

export default Settings;
