"use client";
import Award from "@/components/career_profile/preview/award-preview";
import Certifications from "@/components/career_profile/preview/certifications-preview";
import Education from "@/components/career_profile/preview/education/educations-preview";
import Language from "@/components/career_profile/preview/languages-preview";
import PersonalInformation from "@/components/career_profile/preview/personal-info-preview";
import ProfessionalSummary from "@/components/career_profile/preview/professional-summary-preview";
import Skill from "@/components/career_profile/preview/skills/skill-preview";
import VolunteerExperience from "@/components/career_profile/preview/volunteer-preview";
import Experience from "@/components/career_profile/preview/work_experience/work-experience-preview";
import { CareerProfileLayouts } from "@/components/career_profile/career-profile-layout";

const Profile = () => {
   return (
      <CareerProfileLayouts pageTitle="Career Profile" showHeader isHome>
         <div className="space-y-6    lg:[&_#card-title]:text-lg">
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
      </CareerProfileLayouts>
   );
};

export default Profile;
