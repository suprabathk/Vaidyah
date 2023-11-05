/* eslint-disable @next/next/no-img-element */
"use client";

import ChangeResourseWidget from "@/components/AdminWidget/ChangeResourceWidget";
import UsersWidget from "@/components/AdminWidget/UsersWidget";
import ProfileWidget from "@/components/UserWidgets/ProfileWidget";
import { getUser } from "@/pb/pb";
import { HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const user = getUser();

  return user ? (
    <div className="px-20 bg-gray-200 h-screen flex overflow-y-auto items-start gap-4">
      <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide h-screen py-10 w-[40%]">
        <ProfileWidget user={user} />
        <div className="hidden md:flex flex-col gap-4">
          <Link
            href="/"
            className="w-full rounded-3xl bg-red-300 p-4 flex items-center justify-between"
          >
            <span>Go to Home</span>
            <HomeIcon className="h-5 w-5 text-gray-800" />
          </Link>
          <ChangeResourseWidget />
        </div>
      </div>
      <div className="py-10 w-full">
        <UsersWidget />
      </div>
    </div>
  ) : (
    router.replace("/auth/signin")
  );
}
