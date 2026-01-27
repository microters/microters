'use client';

import { toastSuccess } from 'lib/toast';
import { CommentList } from './CommentList';

export function CommentSection({ initialComments = [], postId, postTitle }) {
  const handleCommentSubmitted = () => {
    toastSuccess('Thank you! Your comment is awaiting moderation.');
  };

  return (
    <div className='bg-white rounded-xl'>
      <CommentList
        comments={initialComments} 
        postTitle={postTitle} 
        postId={postId}
        onCommentSubmitted={handleCommentSubmitted} 
      />
    </div>
  );
}