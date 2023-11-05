/* eslint-disable @next/next/no-img-element */
import { signout } from "@/pb/pb";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { AuthModel } from "pocketbase";

const ProfileWidget = ({ user }: { user: AuthModel }) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="h-[75px] w-[75px] overflow-hidden rounded-full shadow-md flex-shrink-0">
        <img
          src="https://media.istockphoto.com/id/1503492681/photo/serious-man-on-sports-field.webp?b=1&s=170667a&w=0&k=20&c=OArZxqYnaKAPpyU4n799I1yHD30iiyIb8CozNRBC0Yg="
          className="object-cover h-[75px] shadow-md"
          alt="profile"
        />
      </div>
      <div className="bg-violet-300 px-4 py-3 rounded-3xl w-full flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-xl font-semibold text-gray-800">
            {user?.name}
          </span>
          <span className="text-sm text-gray-600">{user?.email}</span>
        </div>
        <button
          onClick={() => {
            signout();
            router.replace("/auth/signin");
          }}
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default ProfileWidget;
