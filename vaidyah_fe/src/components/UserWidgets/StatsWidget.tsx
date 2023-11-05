import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const StatsWidget = () => {
  return (
    <div className="bg-white rounded-3xl p-4">
      <span className="font-semibold text-lg">Statistics</span>
      <div className="mt-4 px-4 py-2 rounded-xl bg-slate-100 font-medium flex items-center gap-2">
        <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
        <span>10 queries sent</span>
      </div>
      <button
        type="submit"
        className="bg-violet-300 w-full py-1 px-4 rounded-xl mt-2 text-gray-800"
      >
        Clear chat
      </button>
    </div>
  );
};

export default StatsWidget;
