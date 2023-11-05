import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex">
      <div className="md:w-[50%]">{children}</div>
      <div className="hidden md:flex w-[50%]">
        <div className="bg-violet-600 px-24 py-24 flex flex-col text-white gap-2 items-center">
          <span className="bg-white rounded-full w-fit font-semibold text-violet-600 px-2 py-1 text-xs self-start">
            Built with AI ✨
          </span>
          <h3 className="text-3xl font-bold">
            Delivering knowledge across the world.
          </h3>
          <p className="font-light text-sm">
            Vaidyah is a digital AI health and nursing assistant to help Nurses
            and Doctors in the most remote parts of the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Layout;
