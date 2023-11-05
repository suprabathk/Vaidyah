import { changeResource } from "@/pb/pb";
import { useState } from "react";

const ChangeResourseWidget = () => {
  const [resourceName, setResourceName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        changeResource({
          files: selectedFiles!,
          name: resourceName,
        });
      }}
      className="bg-white rounded-3xl p-4"
    >
      <span className="font-semibold text-lg">Change resource</span>
      <input
        type="text"
        className="bg-slate-100 rounded-xl py-1 px-3 border border-neutral-300 w-full mt-4 focus:outline outline-violet-400"
        placeholder="Enter resource name..."
        value={resourceName}
        required
        onChange={(e) => setResourceName(e.target.value)}
      />
      <input
        className="mt-2 relative block w-full min-w-0 flex-auto rounded-xl border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-slate-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
        type="file"
        accept="application/pdf"
        required
        onChange={(e) => setSelectedFiles(e.target.files!)}
      />
      <button
        type="submit"
        className="bg-violet-300 w-full py-1 px-4 rounded-xl mt-2 text-gray-800"
      >
        Change resource
      </button>
    </form>
  );
};

export default ChangeResourseWidget;
