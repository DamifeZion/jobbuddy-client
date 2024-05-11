"use client";
import DashboardLayout from "@/components/shared/dashboard/dashboard-layout";
import Header from "@/components/career_profile/header";
import CareerSidebar from "@/components/career_profile/career-sidebar";
import Award from "@/components/career_profile/preview/award-preview";
import Certifications from "@/components/career_profile/preview/certifications-preview";
import Education from "@/components/career_profile/preview/educations-preview";
import Language from "@/components/career_profile/preview/languages-preview";
import PersonalInformation from "@/components/career_profile/preview/personal-info-preview";
import ProfessionalSummary from "@/components/career_profile/preview/professional-summary-preview";
import Skill from "@/components/career_profile/preview/skill-preview";
import VolunteerExperience from "@/components/career_profile/preview/volunteer-preview";
import Experience from "@/components/career_profile/preview/experiences-preview";

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
               <Experience />
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
