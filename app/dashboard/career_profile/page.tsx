import CareerSidebar from "@/components/career_profile/career-sidebar/career-sidebar";
import Header from "@/components/career_profile/header";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout/dashboard-layout";

const Profile = () => {
   return (
      <DashboardLayout hidePageTitle pageTitle="Career Profile">
         <Header />

         <div className="mt-6 flex gap-6 max-lg:flex-col-reverse">
            <div className="flex grow border border-green-600"></div>

            <div>
               <CareerSidebar />
            </div>
         </div>
      </DashboardLayout>
   );
};

export default Profile;
