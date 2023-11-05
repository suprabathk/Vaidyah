/* eslint-disable @next/next/no-img-element */
"use client";

import ChatWidget from "@/components/UserWidgets/ChatWidget";
import ProfileWidget from "@/components/UserWidgets/ProfileWidget";
import ResourceWidget from "@/components/UserWidgets/ResourceWidget";
import { getUser } from "@/pb/pb";
import { FingerPrintIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const user = getUser();

  return user ? (
    <div className="px-20 bg-gray-200 md:h-screen flex flex-col md:flex-row overflow-y-auto items-start gap-4">
      <div className="flex flex-col gap-4 overflow-y-scroll scrollbar-hide md:h-screen py-10 md:w-[40%]">
        <ProfileWidget user={user} />
        <div className="flex flex-col gap-4">
          {user.isAdmin && (
            <Link
              href="/admin"
              className="w-full rounded-3xl bg-red-300 p-4 flex items-center justify-between"
            >
              <span>Open Admin dashboard</span>
              <FingerPrintIcon className="h-5 w-5 text-gray-800" />
            </Link>
          )}
          <ResourceWidget />
        </div>
      </div>
      <div className="md:py-10 w-full">
        <ChatWidget />
      </div>
    </div>
  ) : (
    router.replace("/auth/signin")
  );
}
