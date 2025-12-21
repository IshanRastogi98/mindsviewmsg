import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    // Safer default: block all crawling if base URL is missing
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: [
      {
        userAgent: "*",

        allow: [
          "/",            // public pages
          "/u/",           // public user pages
          "/profile/",     // public profile pages (/profile/[username])
        ],

        disallow: [
          "/api/",
          "/dashboard/",
          "/sign-in/",
          "/sign-up/",
          "/verify/",
          "/forgot-password/",
          "/reset-password/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}