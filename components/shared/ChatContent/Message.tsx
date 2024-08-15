// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Loader2 } from "lucide-react";
// import React, { useEffect, useState } from "react";

// interface MessageProps {
//   conversationId: number; // ID percakapan yang ingin ditampilkan
// }

// interface Message {
//   id: number;
//   senderId: number;
//   text: string;
//   date: string;
// }

// interface User {
//   id: number;
//   name: string;
// }

// interface Conversation {
//   id: number;
//   title: string;
//   users: number[];
//   messages: Message[];
// }

// export default function Message({ conversationId }: MessageProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [newMessage, setNewMessage] = useState<string>(""); // State untuk pesan baru

//   useEffect(() => {
//     const fetchConversationData = async () => {
//       try {
//         const response = await fetch(
//           `https://my-json-server.typicode.com/rizuraa/dummychat/conversations/${conversationId}`
//         );
//         const data = await response.json();
//         setMessages(data.messages);

//         const usersResponse = await fetch(
//           `https://my-json-server.typicode.com/rizuraa/dummychat/users`
//         );
//         const usersData = await usersResponse.json();
//         setLoading(false);
//         setUsers(usersData);
//       } catch (error) {
//         console.error("Error fetching messages or users:", error);
//       }
//     };

//     fetchConversationData();
//   }, [conversationId]);

//   const getSenderName = (senderId: number) => {
//     const user = users.find((user) => user.id === senderId);
//     return user ? user.name : "Unknown";
//   };

//   const getMessageStyle = (senderId: number) => {
//     if (senderId === 1) {
//       return "bg-purple-100 text-purple-800";
//     } else if (senderId === 3) {
//       return "bg-yellow-100 text-yellow-800";
//     } else if (senderId === 6) {
//       return "bg-blue-100 text-blue-800";
//     } else {
//       return "bg-gray-100 text-gray-800";
//     }
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "") return;

//     const newMessageObj: Message = {
//       id: messages.length + 1, // Menggunakan panjang array sebagai ID baru
//       senderId: 1, // ID pengguna yang mengirim pesan baru
//       text: newMessage,
//       date: new Date().toISOString(),
//     };

//     setMessages([...messages, newMessageObj]);
//     setNewMessage(""); // Bersihkan input setelah pesan dikirim
//   };

//   if (loading) {
//     return (
//       <div
//         className="flex flex-col justify-center items-center h-full"
//         style={{ marginTop: "150px" }}
//       >
//         <Loader2 className="animate-spin" />
//         <span className="ml-2 mt-2">Loading Conversations</span>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${
//               message.senderId === 1 ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`p-3 rounded-lg max-w-xs shadow-md ${getMessageStyle(
//                 message.senderId
//               )}`}
//             >
//               <span
//                 className={`block text-sm font-semibold ${
//                   message.senderId === 1 ? "text-right" : "text-left"
//                 }`}
//               >
//                 {getSenderName(message.senderId)}
//               </span>
//               <p>{message.text}</p>
//               <span className="block text-right text-xs text-gray-500">
//                 {new Date(message.date).toLocaleTimeString("id-ID", {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="text-center text-gray-500 text-sm">
//         {new Date(messages[0]?.date).toLocaleDateString("id-ID", {
//           day: "numeric",
//           month: "long",
//           year: "numeric",
//         })}
//       </div>
//       <div className="bg-white p-4 flex items-center space-x-2 sticky bottom-0 overflow-auto mt-48">
//         <Input
//           type="text"
//           placeholder="pesan"
//           className="flex-1"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <Button
//           type="button"
//           className="bg-primary-blue"
//           onClick={handleSendMessage}
//         >
//           Send
//         </Button>
//       </div>
//     </>
//   );
// }

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface MessageProps {
  conversationId: number; // ID percakapan yang ingin ditampilkan
}

interface Message {
  id: number;
  senderId: number;
  text: string;
  date: string;
}

interface User {
  id: number;
  name: string;
}

interface Conversation {
  id: number;
  title: string;
  users: number[];
  messages: Message[];
}

export default function Message({ conversationId }: MessageProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    const fetchConversationData = async () => {
      try {
        const response = await fetch(
          `https://my-json-server.typicode.com/rizuraa/dummychat/conversations/${conversationId}`
        );
        const data = await response.json();
        setMessages(data.messages);

        const usersResponse = await fetch(
          `https://my-json-server.typicode.com/rizuraa/dummychat/users`
        );
        const usersData = await usersResponse.json();
        setLoading(false);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching messages or users:", error);
      }
    };

    fetchConversationData();
  }, [conversationId]);

  const getSenderName = (senderId: number) => {
    const user = users.find((user) => user.id === senderId);
    return user ? user.name : "Unknown";
  };

  const getMessageStyle = (senderId: number) => {
    switch (senderId) {
      case 1:
        return "bg-purple-100 text-purple-800";
      case 3:
        return "bg-yellow-100 text-yellow-800";
      case 6:
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSenderNameStyle = (senderId: number) => {
    switch (senderId) {
      case 1:
        return "text-purple-800";
      case 3:
        return "text-yellow-800";
      case 6:
        return "text-blue-800";
      default:
        return "text-gray-800";
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMessageObj: Message = {
      id: messages.length + 1,
      senderId: 1,
      text: newMessage,
      date: new Date().toISOString(),
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  if (loading) {
    return (
      <div
        className="flex flex-col justify-center items-center h-full"
        style={{ marginTop: "150px" }}
      >
        <Loader2 />
        <span className="ml-2 mt-2">Loading Task List</span>
      </div>
    );
  }

  return (
    <>
      <div className="p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {/* Nama pengirim di atas pesan dengan warna yang sesuai */}
            <span
              className={`block text-sm font-semibold mb-1 ${getSenderNameStyle(
                message.senderId
              )} ${message.senderId === 1 ? "text-right" : "text-left"}`}
            >
              {getSenderName(message.senderId)}
            </span>

            <div
              className={`flex ${
                message.senderId === 1 ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs shadow-md ${getMessageStyle(
                  message.senderId
                )}`}
              >
                <p>{message.text}</p>
                <span className="block text-right text-xs text-gray-500">
                  {new Date(message.date).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-gray-500 text-sm">
        {new Date(messages[0]?.date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      <div className="bg-white p-4 flex items-center space-x-2 sticky bottom-0 overflow-auto mt-48">
        <Input
          type="text"
          placeholder="pesan"
          className="flex-1"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          type="button"
          className="bg-primary-blue"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
    </>
  );
}
