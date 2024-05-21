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
         "Entry Level",
         "Mid Level",
         "Senior Level",
         "Executive Level",

         // NOTE: Convert array string to object easily
      ].map((level) => ({
         label: level,
         value: level.toLowerCase(),
      })),

      workType: [
         "Contract",
         "Full-time",
         "Internship & Graduate",
         "Part-time",
      ].map((level) => ({
         label: level,
         value: level.toLowerCase(),
      })),

      experienceDemoData: [
         {
            companyName: "Firstlincoln Technologies",
            jobTitle: "Full Stack Web Developer",
            jobLevel: "Entry Level",
            workType: "Full-time",
            country: "Nigeria",
            state: "Lagos",
            city: "Surulere",
            startDate: "2023-11-01T08:30:00.000Z",
            endDate: "2024-05-20T22:00:00.000Z",
            currentJob: true,
            jobResponsibilities:
               "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque consequatur quam saepe fugiat nobis ducimus voluptate, dolores impedit voluptates mollitia nisi, voluptatibus distinctio debitis omnis facilis numquam quisquam optio iusto officia odit doloremque ipsum illo inventore placeat. Assumenda veniam obcaecati, eius est, architecto doloribus delectus magnam nobis tempore commodi, velit voluptates sint fugiat mollitia distinctio. Animi, deleniti! Commodi voluptas dolorem assumenda ad eligendi sit officiis id tenetur minima dolor! Reprehenderit veritatis corrupti incidunt ratione aut, consectetur a provident consequatur inventore? Dolore laborum sit consequatur blanditiis? Eum, saepe! Facere aspernatur voluptates dolore. Blanditiis, maxime? Saepe, architecto. Error saepe cum quos iure?",
         },
      ],
   },
};
