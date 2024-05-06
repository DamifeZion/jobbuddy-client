import CareerSidebar from "@/components/career_profile/career-sidebar/career-sidebar";
import Header from "@/components/career_profile/header";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout/dashboard-layout";
import { Card } from "@/components/ui/card";

const Profile = () => {
   return (
      <DashboardLayout hidePageTitle pageTitle="Career Profile">
         <Header />

         <div className="mt-6 flex gap-6 max-lg:flex-col-reverse">
            <Card className="flex grow">
               
            </Card>

            <div>
               <CareerSidebar />
            </div>
         </div>
      </DashboardLayout>
   );
};

export default Profile;
