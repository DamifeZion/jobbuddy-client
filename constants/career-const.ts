import { routeConstants } from "@/constants/route-const";

const {
   profilePersonalInfo,
   profileProfessionalSummary,
   profileExperience,
   profileEducation,
   profileSkill,
   profileCertifications,
   profileLanguage,
   profileAward,
   profileVolunteer,
} = routeConstants.authRoute.nestedRoute;

export const careerConstants = {
   careerRoutes: [
      {
         title: "Personal Information",
         percentage: "0%",
         href: profilePersonalInfo,
         filled: false,
         required: true,
      },
      {
         title: "Professional Summary",
         percentage: "0%",
         href: profileProfessionalSummary,
         filled: false,
         required: true,
      },
      {
         title: "Work Experience",
         percentage: "0%",
         href: profileExperience,
         filled: false,
         required: true,
      },
      {
         title: "Education",
         percentage: "0%",
         href: profileEducation,
         filled: false,
         required: true,
      },
      {
         title: "Skills",
         percentage: "0%",
         href: profileSkill,
         filled: false,
         required: true,
      },
      {
         title: "Languages",
         percentage: "0%",
         href: profileLanguage,
         filled: false,
         required: true,
      },
      {
         title: "Certifications",
         percentage: "0%",
         href: profileCertifications,
         filled: false,
         required: false,
      },
      {
         title: "Awards and Honours",
         percentage: "0%",
         href: profileAward,
         filled: false,
         required: false,
      },
      {
         title: "Volunteer Experience",
         percentage: "0%",
         href: profileVolunteer,
         filled: false,
         required: false,
      },
   ],

   workExperience: {
      jobLevelOptions: [
         "Internship & Graduate",
         "Extry Level",
         "Mid Level",
         "Senior Level",
         "Executive Level",

         // NOTE: Convert array string to object easily
      ].map((level) => ({
         label: level,
         value: level.toLowerCase(),
      })),

      jobIndustry: [
         "Agriculture, Fishing & Forestry",
         "Construction",
         "Banking, Finance & Insurance",
         "Education",
         "Energy & Utilities",
         "Government",
         "Healthcare",
         "Hospitality & Hotel",
         "Recruitment",
         "IT & Telecoms",
         "Law & Compliance",
         "Shipping & Logistics",
         "Manufacturing & Warehousing",
         "Advertising, Media & Communications",
         "Mining, Energy & Metals",
         "NGO, NPO & Charity",
         "Retail, Fashion & FMCG",
         "Enforcement & Security",
         "Real Estate",
         "Tourism & Travel",
         "Automotive & Aviation",
         "Entertainment, Events & Sport",
      ].map((level) => ({
         label: level,
         value: level.toLowerCase(),
      })),

      jobFunction: [
         "Accounting, Auditing & Finance",
         "Admin & Office",
         "Creative & Design",
         "Building & Architecture",
         "Consulting & Strategy",
         "Customer Service & Support",
         "Engineering & Technology",
         "Farming & Agriculture",
         "Food Services & Catering",
         "Hospitality & Leisure",
         "Software & Data",
         "Legal Services",
         "Marketing & Communications",
         "Medical & Pharmaceutical",
         "Product & Project Management",
         "Estate Agents & Property Management",
         "Quality Control & Assurance",
         "Human Resources",
         "Management & Business Development",
         "Community & Social Services",
         "Sales",
         "Supply Chain & Procurement",
         "Research, Teaching & Training",
         "Trades & Services",
         "Driver & Transport Services",
         "Health & Safety",
      ].map((level) => ({
         label: level,
         value: level.toLowerCase(),
      })),

      workType: [
         "Contract",
         "Full Time",
         "Internship & Graduate",
         "Part Time",
      ].map((level) => ({
         label: level,
         value: level.toLowerCase(),
      })),

      experienceDemoData: [
         {
            employer: "Mr Lekan",
            jobTitle: "Full Stack Web Developer",
            jobLevel: "Entry Level",
            country: "Nigeria",
            industry: "IT & Telecom",
            jobFunction: "Software & Data",
            monthlySalary: "75000",
            workType: "",
         },
      ],
   },
};
