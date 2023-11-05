/* eslint-disable @next/next/no-img-element */
import { getUser, getUsers, updateAdminStatus } from "@/pb/pb";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { AuthModel } from "pocketbase";
import { useEffect, useState } from "react";

const UsersWidget = () => {
  const currentUser = getUser();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  const toggleAdminStatus = (userID: string, status: boolean) => {
    updateAdminStatus(userID, status);
    setUsers((users) =>
      users.map((user) =>
        userID === user.id
          ? {
              ...user,
              isAdmin: status,
            }
          : user
      )
    );
  };

  return (
    <div className="relative bg-white rounded-3xl p-4 w-full md:h-[86vh]">
      <div className="flex items-center bg-slate-200 rounded-xl px-4 py-2 gap-4  text-gray-800">
        <UserGroupIcon className="h-7 w-7" />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Users</span>
          <p className="text-sm text-gray-600">Make other users as Admin</p>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto h-[78%] gap-2 my-3">
        {users.map(
          (
            user: {
              id: string;
              email: string;
              name: string;
              isAdmin: boolean;
            },
            idx: number
          ) => (
            <div
              key={idx}
              className={`w-full px-3 py-2 rounded-lg flex items-center justify-between ${
                user.isAdmin ? "bg-violet-300" : "bg-slate-200"
              }`}
            >
              <div className="flex flex-col">
                <span className="text-md font-semibold">{user.name}</span>
                <span>{user.email}</span>
              </div>

              {user.id !== currentUser!.id && (
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.isAdmin}
                    className="sr-only peer"
                    onChange={() => toggleAdminStatus(user.id, !user.isAdmin)}
                  />
                  <div className="w-11 h-6 bg-violet-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                </label>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UsersWidget;
