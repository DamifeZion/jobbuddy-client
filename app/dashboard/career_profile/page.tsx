import CareerSidebar from "@/components/career_profile/career-sidebar";
import Header from "@/components/career_profile/header";
import { PersonalInformation } from "@/components/career_profile/personal-information";
import { ProfessionalSummary } from "@/components/career_profile/professional-summary";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout/dashboard-layout";
import { Card } from "@/components/ui/card";

const Profile = () => {
   return (
      <DashboardLayout hidePageTitle pageTitle="Career Profile">
         <Header />

         <div className="mt-6 flex gap-6 max-lg:flex-col-reverse">
            <div className=" flex-grow">
               <PersonalInformation />
               <ProfessionalSummary />
            </div>

            <div>
               <CareerSidebar />
            </div>
         </div>
      </DashboardLayout>
   );
};

export default Profile;
