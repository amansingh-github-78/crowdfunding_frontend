import { useState } from "react";
import { FaBell } from "react-icons/fa";

const dummySenderMessages = [
  {
    id: 1,
    sender: "backer",
    text: "Hi, is this campaign still active?",
    time: "10:00 AM",
  },
  {
    id: 2,
    sender: "creator",
    text: "Yes, it is active. How can I help?",
    time: "10:05 AM",
  },
];

const dummyReceiverChats = [
  {
    id: 1,
    backerName: "Alice",
    messages: [
      {
        id: 1,
        sender: "backer",
        text: "I really love your campaign!",
        time: "09:30 AM",
      },
    ],
    lastMessage: "I really love your campaign!",
  },
  {
    id: 2,
    backerName: "Bob",
    messages: [
      {
        id: 1,
        sender: "backer",
        text: "When is the next update?",
        time: "10:15 AM",
      },
    ],
    lastMessage: "When is the next update?",
  },
];

const Messages = ({ for: chatFor }) => {
  // For sender (backer) conversation
  const [senderMessages, setSenderMessages] = useState(dummySenderMessages);
  const [newMessage, setNewMessage] = useState("");

  // For receiver (campaigner) scenario: list of chats and active chat
  const [receiverChats, setReceiverChats] = useState(dummyReceiverChats);
  const [activeChat, setActiveChat] = useState(null);
  const [newChatMessage, setNewChatMessage] = useState("");

  // Control chat dialog visibility
  const [showChat, setShowChat] = useState(false);
  const notificationCount = 10;

  const handleSendSender = () => {
    if (newMessage.trim() !== "") {
      const message = {
        id: senderMessages.length + 1,
        sender: "you",
        text: newMessage,
        time: "Now",
      };
      setSenderMessages([...senderMessages, message]);
      setNewMessage("");
    }
  };

  const handleSendReceiver = () => {
    if (newChatMessage.trim() !== "" && activeChat) {
      const updatedMessages = [
        ...activeChat.messages,
        {
          id: activeChat.messages.length + 1,
          sender: "you",
          text: newChatMessage,
          time: "Now",
        },
      ];
      const updatedChat = {
        ...activeChat,
        messages: updatedMessages,
        lastMessage: newChatMessage,
      };
      setActiveChat(updatedChat);
      setReceiverChats(
        receiverChats.map((chat) =>
          chat.id === activeChat.id ? updatedChat : chat
        )
      );
      setNewChatMessage("");
    }
  };

  return (
    <div className="lg:w-4xl md:w-2xl w-full">
      {!showChat ? (
        <button
          onClick={() => setShowChat(true)}
          className="relative flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Messages
          <div className="relative ml-2">
            <FaBell className="text-2xl text-white animate-pulse" />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full">
                {notificationCount}
              </span>
            )}
          </div>
        </button>
      ) : (
        // Chat dialog container: positioned at upper-left of the message button.
        <div className="z-50">
          {chatFor === "sender" && (
            <div className="lg:w-4xl md:w-2xl w-full bg-white dark:bg-blue-900 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Chat with Campaigner
                </h2>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  &times;
                </button>
              </div>
              <div className="h-64 overflow-y-auto border rounded p-2 mb-4 bg-gray-50 flex flex-col">
                {senderMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-2 p-2 rounded ${
                      msg.sender === "you"
                        ? "bg-green-700 text-white"
                        : "bg-[#e0ba03] text-end text-black "
                    }`}
                  >
                    <p className="text-sm">
                      {msg.text}
                    </p>
                    <span className="text-xs">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendSender();
                    }
                  }}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendSender}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </div>
          )}
          {chatFor === "receiver" && !activeChat && (
            <div className="lg:w-4xl md:w-2xl w-full bg-white dark:bg-blue-900 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Backer Chats
                </h2>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  &times;
                </button>
              </div>
              <div className="h-64 overflow-y-auto border rounded p-2 bg-gray-50">
                {receiverChats.map((chat) => (
                  <div
                    key={chat.id}
                    onClick={() => setActiveChat(chat)}
                    className="p-2 mb-2 rounded bg-[#e0ba03] hover:bg-amber-300 cursor-pointer"
                  >
                    <h3 className="font-semibold text-gray-800">
                      {chat.backerName}
                    </h3>
                    <p className="text-sm text-gray-700 truncate">
                      {chat.lastMessage}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {chatFor === "receiver" && activeChat && (
            <div className="lg:w-4xl md:w-2xl w-full bg-white dark:bg-blue-900 p-4 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Chat with {activeChat.backerName}
                </h2>
                <button
                  onClick={() => setActiveChat(null)}
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                >
                  &times;
                </button>
              </div>
              <div className="h-64 overflow-y-auto border rounded p-2 bg-gray-50 flex flex-col">
                {activeChat.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`mb-2 p-2 rounded ${
                      msg.sender === "you"
                        ? "bg-green-700 text-white"
                        : "bg-[#e0ba03] text-end text-black"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span className="text-xs">{msg.time}</span>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2 py-4">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newChatMessage || ""}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendReceiver(); 
                    }
                  }}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendReceiver}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
