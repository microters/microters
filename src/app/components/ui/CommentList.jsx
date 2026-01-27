'use client';

import { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { CommentForm } from './CommentForm';

function CommentItem({ comment, postId, onReplySubmitted }) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const isPending = comment.status === 'PENDING';

  const handleReplySuccess = () => {
    onReplySubmitted();
    setShowReplyForm(false);
  };

  return (
    <div className={`group ${isPending ? 'opacity-60' : ''}`}>
      <div className="flex gap-4">
        {/* Avatar Placeholder */}
        <div className="shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-200">
           <FiUser size={20} />
        </div>

        <div className="grow">
          {/* Header */}
          <div className="flex items-center justify-between mb-1">
            <div>
              <h5 className="font-bold text-[#212c4a] text-sm">{comment.authorName}</h5>
              <span className="text-xs text-gray-400">
                {new Date(comment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            {!isPending && (
                <button 
                    onClick={() => setShowReplyForm(!showReplyForm)} 
                    className="text-xs font-bold text-[#f35d36] hover:underline"
                >
                    Reply
                </button>
            )}
          </div>

          {/* Content */}
          <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-xl rounded-tl-none border border-gray-100">
             <p>{comment.content}</p>
          </div>

          {isPending && (
            <span className="inline-block mt-2 text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded border border-yellow-200">
              Awaiting Moderation
            </span>
          )}

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-4 pl-4 border-l-2 border-[#f35d36]/20">
              <CommentForm 
                postId={postId}
                parentId={comment.id}
                onCommentSubmitted={handleReplySuccess}
                buttonText="Post Reply"
              />
            </div>
          )}
        </div>
      </div>

      {/* Recursive Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-6 pl-6 md:pl-16 space-y-6">
          {comment.replies.map(reply => (
            <CommentItem 
                key={reply.id} 
                comment={reply} 
                postId={postId} 
                onReplySubmitted={onReplySubmitted} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentList({ comments, postTitle, postId, onCommentSubmitted }) {
  const countComments = (list) => {
    return list.reduce((acc, curr) => acc + 1 + (curr.replies ? countComments(curr.replies) : 0), 0);
  };
  const totalCount = countComments(comments);

  return (
    <div>
      <h3 className="text-2xl font-bold text-[#212c4a] mb-8 border-b border-gray-100 pb-4">
        {totalCount} Comments
      </h3>
      
      {/* List */}
      <div className="space-y-8 mb-12">
        {comments.length > 0 ? (
            comments.map(comment => (
            <CommentItem 
                key={comment.id} 
                comment={comment} 
                postId={postId} 
                onReplySubmitted={onCommentSubmitted} 
            />
            ))
        ) : (
            <p className="text-gray-400 italic">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>

      {/* Main Comment Form */}
      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
        <h3 className="text-xl font-bold text-[#212c4a] mb-2">Leave a Reply</h3>
        <p className="text-xs text-gray-500 mb-6">Your email address will not be published. Required fields are marked *</p>
        <CommentForm postId={postId} onCommentSubmitted={onCommentSubmitted}/>
      </div>
    </div>
  );
}