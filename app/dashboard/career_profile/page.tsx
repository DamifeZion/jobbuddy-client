"use client";
import Award from "@/components/career_profile/awards";
import CareerSidebar from "@/components/career_profile/career-sidebar";
import Certifications from "@/components/career_profile/certifications";
import Education from "@/components/career_profile/education";
import Header from "@/components/career_profile/header";
import Language from "@/components/career_profile/language";
import PersonalInformation from "@/components/career_profile/personal-information";
import ProfessionalSummary from "@/components/career_profile/professional-summary";
import Skill from "@/components/career_profile/skill";
import VolunteerExperience from "@/components/career_profile/volunteer-experience";
import WorkExperience from "@/components/career_profile/work_experience";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout/dashboard-layout";

const Profile = () => {
   return (
      <DashboardLayout hidePageTitle pageTitle="Career Profile">
         <Header />

         <div className="mt-6 flex gap-6 max-lg:flex-col-reverse">
            <div
               className="
               space-y-6 flex-grow
               lg:[&_#card-title]:text-lg
            "
            >
               <PersonalInformation />
               <ProfessionalSummary />
               <WorkExperience />
               <Education />
               <Skill />
               <Language />
               <Certifications />
               <Award />
               <VolunteerExperience />
            </div>

            <div className="flex-grow">
               <CareerSidebar />
            </div>
         </div>
      </DashboardLayout>
   );
};

export default Profile;
