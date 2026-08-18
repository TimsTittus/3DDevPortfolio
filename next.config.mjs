/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // One canonical URL shape: no trailing slashes anywhere.
  trailingSlash: false,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Skill icons used by the experience section.
      { protocol: "https", hostname: "cdn.jsdelivr.net" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
    ],
  },
  experimental: {
    // Tree-shakes the icon barrels, which dominate the client bundle.
    optimizePackageImports: ["react-icons", "lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      // Common inbound variants that would otherwise 404.
      { source: "/blog", destination: "/blogs", permanent: true },
      { source: "/blog/:slug", destination: "/blogs/:slug", permanent: true },
      { source: "/articles", destination: "/blogs", permanent: true },
      { source: "/articles/:slug", destination: "/blogs/:slug", permanent: true },
      { source: "/cv", destination: "/resume", permanent: true },
    ];
  },
};

export default nextConfig;
