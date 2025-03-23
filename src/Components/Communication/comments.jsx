import { useState , useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getComments,
  addComment,
  replyToComment,
} from "../../Store/Communication/commentApi";

const Comments = ({ campaignId , isMyCampaign}) => {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [loginError, setLoginError] = useState("");

  // Fetch comments using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", campaignId],
    queryFn: () => getComments(campaignId),
  });

  // Mutation to add a new comment
  const addCommentMutation = useMutation({
    mutationFn: (content) => addComment(campaignId, content),
    onSuccess: () => queryClient.invalidateQueries(["comments", campaignId]),
    onError: (err)=> setLoginError(err.response?.data?.message || "Login First!!")
  });

  // Mutation to reply to a comment
  const replyMutation = useMutation({
    mutationFn: ({ commentId, reply }) =>
      replyToComment(campaignId, commentId, reply),
    onSuccess: () => queryClient.invalidateQueries(["comments", campaignId]),
  });

  useEffect(() => {
    if (loginError) {
      const timer = setTimeout(() => {
        setLoginError("");
      }, 3000); // 3 seconds
  
      return () => clearTimeout(timer); // Cleanup function
    }
  }, [loginError]);

  // Handle posting a new comment
  const handlePost = () => {
    if (newComment.trim()) {
      addCommentMutation.mutate(newComment);
      setNewComment("");
    }
  };

  // Handle posting a reply
  const handleReply = (commentId) => {
    if (replyText.trim()) {
      replyMutation.mutate({ commentId, reply: replyText });
      setReplyText("");
      setReplyingTo(null);
    }
  };

  return (
    <div className="lg:w-4xl md:w-2xl w-full">
      <div className="rounded px-4 mb-4 bg-blue-900 flex flex-col">
        <div className="bg-white p-4 rounded">
          {isLoading ? (
            <p className="text-center text-gray-500">Loading comments...</p>
          ) : error ? (
            <p className="text-center text-red-500">Failed to load comments.</p>
          ) : (
            data?.data?.comments?.map((com) => (
              <div key={com._id} className="mb-4 p-3 rounded bg-[#e0ba03]">
                <p className="text-sm font-semibold text-gray-950">
                  {com.name}
                </p>
                <p className="text-sm text-gray-900">{com.content}</p>
                <span className="text-xs text-gray-800">
                  {com.formattedTime}
                </span>

                {/* Show reply if exists */}
                {com.reply && (
                  <div className="mt-2 ml-4 p-2 border-l-2 border-gray-600 bg-gray-100 rounded">
                    <p className="text-xs font-semibold text-gray-900">
                      Campaigner Reply:
                    </p>
                    <p className="text-xs text-gray-800">{com.reply}</p>
                  </div>
                )}

                {/* Reply button for campaign creator */}
                {!com.reply && isMyCampaign && (
                  <button
                    onClick={() => setReplyingTo(com._id)}
                    className="text-blue-600 text-xs mt-1 hover:underline block"
                  >
                    Reply
                  </button>
                )}

                {/* Reply input box */}
                {replyingTo === com._id && (
                  <div className="mt-2 flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="flex-grow border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleReply(com._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {loginError && <p className="block text-white bg-red-500 text-md font-semibold p-2 mt-2">
          {loginError}
        </p> }

        {/* Add new comment */}
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
