import { getResource } from "@/pb/pb";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

const ResourceWidget = () => {
  const [resource, setResource] = useState<any>({ name: "" });

  useEffect(() => {
    getResource().then((data) => {
      setResource(data);
    });
  }, []);

  return (
    <div className="bg-white rounded-3xl p-4">
      <span className="font-semibold text-lg">Current resource</span>
      <div className="mt-4 flex flex-col gap-3 overflow-y-auto">
        <div className="px-4 py-2 rounded-xl bg-slate-100 font-medium flex items-center gap-2">
          <BookOpenIcon className="h-5 w-5" />
          <span>{resource.name}</span>
        </div>
      </div>
    </div>
  );
};

export default ResourceWidget;
