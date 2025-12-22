"use client";

import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { errorToast } from "@/components/ui/sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { Skeleton } from "@/components/ui/skeleton";

type ProfileResponse = {
  username: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
};

type MeResponse = {
  username: string;
  email: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
};

export default function ProfileClient({
  profileUsername,
}: {
  profileUsername: string;
}) {
  const router = useRouter();

  const [profile, setProfile] = useState<{
    username: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
  } | null>(null);

  const [me, setMe] = useState<{
    username: string;
    email: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
  } | null>(null);

  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingMe, setIsLoadingMe] = useState(false);

  const fetchProfile = useCallback(async () => {
    setIsLoadingProfile(true);

    try {
      const response = await axios.get<ApiResponse>(
        `/api/user-profile/${profileUsername}`
      );

      if (response.data?.success && response.data.user) {
        setProfile(response.data.user as ProfileResponse);
      } else {
        errorToast({
          message: "Error",
          description: response.data?.message || "Failed to load profile data.",
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      errorToast({
        message: "Error",
        description:
          axiosError.response?.data.message || "Failed to load profile data.",
      });
    } finally {
      setIsLoadingProfile(false);
    }
  }, [profileUsername]);

  const fetchMe = useCallback(async () => {
    setIsLoadingMe(true);

    try {
      const response = await axios.get<ApiResponse>("/api/me");

      if (response.data?.success && response.data.user) {
        setMe(response.data.user as MeResponse);
      }
    } catch {
      // silent fail — user may be logged out
    } finally {
      setIsLoadingMe(false);
    }
  }, []);

  /* ---------- PROFILE ---------- */

  useEffect(() => {
    fetchProfile();
    fetchMe();
  }, [fetchProfile, fetchMe]);

  function ProfileSkeleton() {
    return (
      <>
        <div className="flex gap-2 justify-center">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-28 rounded-full" />
        </div>

        <Skeleton className="h-10 w-full rounded-xl mt-4" />
      </>
    );
  }

  function OwnerSkeleton() {
    return (
      <>
        <div className="flex gap-2 justify-center">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-28 rounded-full" />
        </div>

        <div className="flex flex-col gap-3 w-full mt-4">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-3 w-40 mx-auto" />
        </div>
      </>
    );
  }
  if (isLoadingProfile || !profile) {
    return <ProfileSkeleton />;
  }
  if (isLoadingMe) {
    // we don’t know yet if user is owner
    // show neutral skeleton (visitor-safe)
    return <ProfileSkeleton />;
  }

  const isOwner = me?.username === profile?.username;

  /* ================= OWNER VIEW ================= */
  if (isOwner && me) {
    return (
      <>
        <div className="flex gap-2 flex-wrap justify-center">
          {profile.isVerified && <Badge>Verified</Badge>}
          <Badge variant="outline">
            {profile.isAcceptingMessages
              ? "Accepting Messages"
              : "Messages Off"}
          </Badge>
        </div>

        <div className="flex flex-col gap-3 w-full mt-4">
          {/* Change Password */}
          <Button asChild variant="outline">
            <Link href="/profile/change-password">Change Password</Link>
          </Button>

          {/* Dashboard */}
          <Button asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>

          {/* Email (owner only, informational) */}
          <p className="text-xs text-zinc-500 text-center whitespace-normal">
            Logged in as{" "}
            <span className="font-medium break-all max-w-full inline-block">
              {me.email}
            </span>
          </p>
        </div>
      </>
    );
  }

  /* ================= VISITOR VIEW ================= */
  return (
    <>
      {profile.isVerified && <Badge>Verified</Badge>}

      {profile.isAcceptingMessages ? (
        <Button asChild className="w-full mt-4 rounded-xl">
          <Link href={`/u/${profile.username}`}>Send Anonymous Message</Link>
        </Button>
      ) : (
        <Button className="w-full mt-4" disabled>
          Not Accepting Messages
        </Button>
      )}
    </>
  );
}
