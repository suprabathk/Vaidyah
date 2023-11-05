import { useState } from "react";
import { setOpenAIKey } from "@/pb/pb";
import { AuthModel } from "pocketbase";

const OpenAIWidget = ({ user }: { user: AuthModel }) => {
  const [key, setKey] = useState(user?.OpenAIKey);
  const [loading, setLoading] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        setLoading(true);
        e.preventDefault();
        setOpenAIKey(key).then(() => setLoading(false));
      }}
      className="bg-white rounded-3xl p-4"
    >
      <span className="font-semibold text-lg">OpenAI Key</span>
      <input
        type="text"
        className="bg-slate-100 rounded-xl py-1 px-3 border border-neutral-300 w-full mt-4 focus:outline outline-violet-400"
        placeholder="Enter OpenAI Key..."
        value={key}
        onChange={(e) => setKey(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-violet-300 w-full py-1 px-4 rounded-xl mt-2 text-gray-800"
      >
        {loading ? "Setting key" : "Set key"}
      </button>
    </form>
  );
};

export default OpenAIWidget;
