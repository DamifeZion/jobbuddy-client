"use client";
import Award from "@/app/dashboard/career_profile/awards/page";
import CareerSidebar from "@/components/career_profile/career-sidebar";
import Certifications from "@/app/dashboard/career_profile/certifications/page";
import Education from "@/app/dashboard/career_profile/educations/page";
import Header from "@/components/career_profile/header";
import Language from "@/app/dashboard/career_profile/languages/page";
import PersonalInformation from "@/app/dashboard/career_profile/personal_information/page";
import ProfessionalSummary from "@/app/dashboard/career_profile/professional_summary/page";
import Skill from "@/app/dashboard/career_profile/skills/page";
import VolunteerExperience from "@/app/dashboard/career_profile/volunteer/page";
import WorkExperience from "@/app/dashboard/career_profile/experiences/page";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout";

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
