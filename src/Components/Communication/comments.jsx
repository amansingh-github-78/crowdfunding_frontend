import { useState } from "react";

const Comments = () => {
  // Dummy public comments
  const [comments, setComments] = useState([
    { id: 1, author: "Alice", text: "Great campaign!", time: "09:00 AM" },
    {
      id: 2,
      author: "Bob",
      text: "Looking forward to updates.",
      time: "09:15 AM",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handlePost = () => {
    if (newComment.trim() !== "") {
      const comment = {
        id: comments.length + 1,
        author: "You",
        text: newComment,
        time: "Now",
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <div className="lg:w-4xl md:w-2xl w-full">
      <div className="rounded px-4 mb-4 bg-blue-900 flex flex-col">
        <div className="bg-white p-4 rounded">
          {comments.map((com) => (
            <div key={com.id} className="mb-2 p-2 rounded bg-[#e0ba03]">
              <p className="text-sm font-semibold text-gray-950">
                {com.author}
              </p>
              <p className="text-sm text-gray-900">{com.text}</p>
              <span className="text-xs text-gray-800">{com.time}</span>
            </div>
          ))}
        </div>
        <div className="flex space-x-2 py-4">
          <input
            type="text"
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-grow border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handlePost}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
