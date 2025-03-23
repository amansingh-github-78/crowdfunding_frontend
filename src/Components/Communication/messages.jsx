import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sendMessage, replyToMessage, getMessages } from "../../Store/Communication/messageApi";
import { FaBell } from "react-icons/fa";

const Messages = ({ chatFor, campaignId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [newChatMessage, setNewChatMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [receiverChats, setReceiverChats] = useState([]);

  // Fetch messages for campaigners
  const { data } = useQuery({
    queryKey: ["messages", campaignId],
    queryFn: () => getMessages(campaignId),
    enabled: chatFor === "receiver",
    onSuccess: (data) => {
      console.log("HERE IS WHAT I AM GETTING:", data?.data)
    },
  });
  
  
  useEffect(() => {
    if (data?.data?.messages) {
      setReceiverChats(data?.data?.messages);
    }
    console.log("HERE IS WHAT I AM GETTING:", data?.data?.messages)
    console.log("showChat:", showChat);
    console.log("chatFor:", chatFor);
    console.log("messages:", messages);
    console.log("receiverChats:", receiverChats);
    console.log("activeChat:", activeChat);
  }, [showChat, chatFor, messages, receiverChats, activeChat, data]);
  
  // Mutations
  const sendMutation = useMutation({
    mutationFn: ({ content, receiverId }) => sendMessage(campaignId, content, receiverId),
    onSuccess: (response) => {
      setMessages((prev) => [...prev, response.data.message]);
      setNewMessage("");
    },
  });
  

  const replyMutation = useMutation({
    mutationFn: ({ messageId, content }) => replyToMessage(campaignId, messageId, content),
    onSuccess: (response) => {
      if (activeChat) {
        setActiveChat((prevChat) => ({
          ...prevChat,
          messages: [...(prevChat.messages || []), response.data.replyMessage], // Ensure messages exists
        }));
      }
      setNewChatMessage("");
    },
  });
  

  const handleSendSender = () => {
    if (newMessage.trim() !== "") {
      sendMutation.mutate({ content: newMessage, receiverId: campaignId });
    }
  };

  const handleSendReceiver = () => {
    if (newChatMessage.trim() !== "" && activeChat) {
      replyMutation.mutate({ messageId: activeChat._id, content: newChatMessage });
    }
  };

  return (
    <div className="lg:w-4xl md:w-2xl w-full">
      {!showChat ? (
        <button onClick={() => setShowChat(true)} className="relative flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Messages
          <div className="relative ml-2">
            <FaBell className="text-2xl text-white animate-pulse" />
          </div>
        </button>
      ) : (
        <div className="z-50">
          {chatFor === "sender" && (
            <div className="lg:w-4xl md:w-2xl w-full bg-white dark:bg-blue-900 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Chat with Campaigner</h2>
                <button onClick={() => setShowChat(false)} className="text-2xl font-bold">&times;</button>
              </div>
              <div className="h-64 overflow-y-auto border rounded p-2 mb-4">
                {messages.map((msg) => (
                  <div key={msg._id} className={`mb-2 p-2 rounded ${msg.sender === "you" ? "bg-green-700 text-white" : "bg-yellow-500 text-black"}`}>
                    <p className="text-sm">{msg.content}</p>
                    <span className="text-xs">{msg.formattedTime}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onKeyDown={(e) => e.key === "Enter" && handleSendSender()}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-md"
                />
                <button onClick={handleSendSender} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Send</button>
              </div>
            </div>
          )}
          {chatFor === "receiver" && (
            <div className="lg:w-4xl md:w-2xl w-full bg-white dark:bg-blue-900 p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-4">Chats with Backers</h2>
              <ul className="border rounded p-2 mb-4">
                {receiverChats.map((chat) => (
                  <li key={chat.id} className="p-2 border-b cursor-pointer hover:bg-gray-200" onClick={() => setActiveChat(chat)}>
                    Chat with {chat.backerName}
                  </li>
                ))}
              </ul>
              {activeChat && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Chat with {activeChat.backerName}</h2>
                    <button onClick={() => setActiveChat(null)} className="text-2xl font-bold">&times;</button>
                  </div>
                  <div className="h-64 overflow-y-auto border rounded p-2">
                    {messages.map((msg) => (
                      <div key={msg._id} className={`mb-2 p-2 rounded ${msg.sender === "you" ? "bg-green-700 text-white" : "bg-yellow-500 text-black"}`}>
                        <p className="text-sm">{msg.content}</p>
                        <span className="text-xs">{msg.formattedTime}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2 py-4">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newChatMessage}
                      onKeyDown={(e) => e.key === "Enter" && handleSendReceiver()}
                      onChange={(e) => setNewChatMessage(e.target.value)}
                      className="flex-grow px-4 py-2 border rounded-md"
                    />
                    <button onClick={handleSendReceiver} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Send</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
