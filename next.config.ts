import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placedog.net" },
      { protocol: "https", hostname: "cataas.com" },
      {
        protocol: "https",
        hostname: "oz-withpet.kro.kr",
        pathname: "/media/**", // 옵션이긴 한데 이렇게 범위 좁혀두면 좋음
      },
    ],
  },
};

export default nextConfig;
