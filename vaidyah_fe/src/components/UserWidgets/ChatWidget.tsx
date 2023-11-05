/* eslint-disable @next/next/no-img-element */
import { addMessage, getMessages } from "@/pb/pb";
import {
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

const ChatWidget = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    getMessages().then((data) => {
      setMessages(data);
    });
  }, []);

  const sendQuery = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/askQuery/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: message,
      }),
    });
    const data = await res.json();
    return data.result;
  };

  return (
    <div className="relative bg-white rounded-3xl p-4 w-full md:h-[86vh]">
      <div className="flex items-center bg-slate-200 rounded-xl px-4 py-2 gap-4  text-gray-800">
        <ChatBubbleLeftRightIcon className="h-7 w-7" />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">Chat with AI</span>
          <p className="text-sm text-gray-600">
            Try asking queries about provided resources
          </p>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto h-[78%] scrollbar-hide">
        {messages.map(
          (
            chat: {
              message: string;
              reply: string;
            },
            idx: number
          ) => (
            <div key={idx} className="flex flex-col my-3">
              <div className="flex justify-end items-center gap-2 text-gray-800">
                <div className="bg-violet-300 w-fit px-3 py-2 rounded-lg rounded-tr-none">
                  {chat.message}
                </div>
                <div className="h-8 w-8 overflow-hidden rounded-full shadow-md">
                  <img
                    src="https://media.istockphoto.com/id/1503492681/photo/serious-man-on-sports-field.webp?b=1&s=170667a&w=0&k=20&c=OArZxqYnaKAPpyU4n799I1yHD30iiyIb8CozNRBC0Yg="
                    className="object-cover h-8 shadow-md"
                    alt="profile"
                  />
                </div>
              </div>
              <div className="flex justify-start items-center gap-2 mt-2">
                <div className="h-8 w-8 overflow-hidden rounded-full shadow-md">
                  <img
                    src="https://st2.depositphotos.com/42546960/47751/v/450/depositphotos_477514008-stock-illustration-letter-logo-design-vector-template.jpg"
                    className="object-cover h-8"
                    alt="profile"
                  />
                </div>
                <div className="bg-slate-200 w-fit px-3 py-2 rounded-lg rounded-tl-none">
                  {chat.reply}
                </div>
              </div>
            </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>
      <form className="flex bg-slate-200 rounded-xl w-[95%] absolute bottom-4 px-4 focus-within:outline outline-violet-400">
        <input
          type="text"
          className="bg-transparent py-2  w-full outline-none rounded-xl "
          value={message}
          autoFocus
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            loading ? "Generating your answer 🧠" : "Type something..."
          }
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setLoading(true);
            sendQuery().then((reply) => {
              addMessage({
                message: message,
                reply: reply,
              });
              setMessages((messages) => [
                ...messages,
                {
                  message: message,
                  reply: reply,
                },
              ]);
              setLoading(false);
            });
            setMessage("");
          }}
        >
          {loading ? (
            <ArrowPathIcon className="h-5 w-5 text-gray-800 animate-spin" />
          ) : (
            <PaperAirplaneIcon className="h-5 w-5 text-gray-800 hover:text-violet-600 transition-colors" />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChatWidget;
