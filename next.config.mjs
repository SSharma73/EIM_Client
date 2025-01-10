/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // NEXTAUTH_URL: "https://admin.eim.digital/",
<<<<<<< HEAD
    NEATH_URL: "http://localhost:3001",
=======
    NEATH_URL: "http://localhost:3000",
>>>>>>> b1a2f5c00ce8fe3d95202dea1d1ef80412dd3640
    NEXTAUTH_SECRET: "Vx4GgzAwkhQXxwL3r3a0rcbxgF63Rmp2ke11yd5K8dY=",
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,  
      },
    ];
  },
};  

export default nextConfig;
