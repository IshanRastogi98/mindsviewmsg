import { MetadataRoute } from "next";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

export const revalidate = 60 * 60 * 6; // 6 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!baseUrl) {
    return [];
  }

  const now = new Date();

  // Static routes
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ];

  // Dynamic routes
  await dbConnect();
  const users = await UserModel.find({ isVerified: true }).select("username");

  const userRoutes = users.flatMap((user) => [
    {
      url: `${baseUrl}/u/${user.username}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/profile/${user.username}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.7,
    },
  ]);

  return [...staticRoutes, ...userRoutes];
}
