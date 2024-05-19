/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "www.res.cloudinary.com",
         }, //NOTE: Matches any image URL that starts with 'https://res.cloudinary.com/'
      ],
   },
};

export default nextConfig;
