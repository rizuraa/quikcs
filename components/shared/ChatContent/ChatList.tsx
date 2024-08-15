import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ChatListProps {
  onSelect: (conversationId: number, title: string) => void; // Fungsi untuk memilih chat
}

interface Conversation {
  id: number;
  title: string;
  users: number[];
  messages: { id: number; senderId: number; text: string; date: string }[];
}

export default function ChatList({ onSelect }: ChatListProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://my-json-server.typicode.com/rizuraa/dummychat/conversations"
        );
        const data = await response.json();
        setLoading(false);
        setConversations(data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center h-full"
        style={{ marginTop: "150px" }}
      >
        <Loader2 className="animate-spin" />
        <span className="ml-2 mt-2">Loading Message List</span>
      </div>
    );
  }

  return (
    <>
      <div className="w-full"></div>
      {conversations.map((conversation) => {
        const lastMessage =
          conversation.messages[conversation.messages.length - 1];

        return (
          <div
            key={conversation.id}
            className="flex flex-row mt-3 cursor-pointer"
            onClick={() => onSelect(conversation.id, conversation.title)} // Pass conversationId here
          >
            <div>
              <Image
                src="/logo/chatlogo.png"
                width={40}
                height={30}
                alt="logo"
                className="mt-2"
              />
            </div>
            <div className="ml-3">
              <div className="text-primary-blue">{conversation.title}</div>
              <div>
                <h3 className="font-bold">User:</h3>
              </div>
              <div>
                <h3>{lastMessage?.text || "No messages yet"}</h3>
              </div>
            </div>
            <div className="ml-3">
              {new Date(lastMessage?.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        );
        <Separator className="my-2 w-max" />;
      })}
    </>
  );
}
