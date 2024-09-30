"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image"; 

const Artwork = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false); 
  const commentInputRef = useRef(null); 
  const commentSectionRef = useRef(null); 
  const newCommentRef = useRef(null); 


  const fetchComments = async () => {
    try {
      const response = await axios.get("/api/comments");
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    const commentData = {
      text: newComment,
      replyTo: replyTo,
    };

    try {
      await axios.post("/api/comments", commentData);
      setNewComment("");
      setReplyTo(null);
      fetchComments();

      
      setTimeout(() => {
        if (newCommentRef.current) {
          newCommentRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); 
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit(e);
    }
  };

  const toggleVideoModal = () => {
    setIsVideoModalOpen(!isVideoModalOpen);
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("video-modal-overlay")) {
      toggleVideoModal();
    }
  };

  const handleReply = (commentId) => {
    setReplyTo(commentId);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
      commentInputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="artwork-container py-10 bg-pink-50">
      <h1 className="text-5xl font-bold mb-6 text-center text-pink-600">Silence of Love</h1>

      {/* Artwork Image Section */}
      <div className="artwork-image-container flex justify-center mb-8">
        <Image
          src="/artwork.png"
          alt="Silence of Love"
          height={800}
          width={600}
          className="w-full max-w-4xl h-auto rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer"
          onClick={toggleVideoModal}
        />
      </div>

      {/* Artwork Details */}
      <div className="artwork-details bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4 text-pink-500">Artwork Details</h2>
        <p className="text-lg text-pink-700 mb-2">Size: 80 x 60 cm</p>
        <p className="text-lg text-pink-700 mb-2">Materials: Oil and flour on canvas</p>
        <p className="text-lg text-pink-700 mb-2">Year of creation: 2023</p>
        <p className="mt-4 text-gray-700">
          This work represents personal reflection and connection with nature, specifically the forest. Each viewer projects their own psychological landscape...
        </p>
      </div>

      {/* Comments Section */}
      <div className="comments-section mt-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-pink-500">Comments</h2>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <textarea
            ref={commentInputRef}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Leave a comment"
            required
            className="w-full h-20 p-3 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-shadow text-black"
          />
          <button
            id="submit-button"
            type="submit"
            className="mt-4 px-6 py-3 bg-pink-400 text-white font-bold rounded-lg shadow-lg hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-600 transition-transform transform hover:scale-105"
          >
            Submit
          </button>
        </form>

        {/* Render Comments */}
        <div className="comment-list space-y-6" ref={commentSectionRef}>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div
                key={comment.id}
                className="comment bg-gray-50 p-4 rounded-lg shadow-sm"
                ref={index === comments.length - 1 ? newCommentRef : null} // Reference for last comment (new one)
              >
                <p className="font-medium text-black">{comment.text}</p>
                <div className="reply-button mt-2">
                  <button
                    className="text-pink-400 font-semibold hover:text-pink-500"
                    onClick={() => handleReply(comment.id)}
                  >
                    Reply
                  </button>
                </div>

                {/* Render Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="replies mt-4 ml-6 border-l-2 border-pink-200 pl-4 space-y-2">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="reply bg-white p-2 rounded-lg shadow-inner">
                        <p className="text-sm text-black">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to leave a comment!</p>
          )}
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="video-modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={handleModalClick}
        >
          <div className="modal-content relative max-w-3xl w-full">
            <video controls autoPlay className="w-full h-auto rounded-lg z-50">
              <source src="/artwork-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Artwork;
