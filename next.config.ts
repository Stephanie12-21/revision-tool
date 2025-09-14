// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   allowedDevOrigins: [
//     "http://localhost:3000", // ton frontend local
//     "https://revision-tool-backend.onrender.com", // ton backend déployé
//   ],
// };

// export default nextConfig;
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    "http://localhost:3000", // ton frontend local
    "https://revision-tool-backend.onrender.com", // ton backend déployé
  ],
};

export default withPWA({
  dest: "public", // dossier où seront générés les fichiers du service worker
  register: true, // enregistre automatiquement le SW
  skipWaiting: true, // active le nouveau SW sans attendre
})(nextConfig);
