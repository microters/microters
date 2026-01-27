'use client';

import { toastError } from 'lib/toast';
import { useState } from 'react';

export function CommentForm({ postId, parentId = null, onCommentSubmitted, buttonText = "Post Comment" }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    authorName: '',
    authorEmail: '',
    content: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, postId, parentId }),
      });

      if (!res.ok) throw new Error('Failed to post comment');
      setFormData({ authorName: '', authorEmail: '', content: '' });
      
      if (onCommentSubmitted) onCommentSubmitted();

    } catch (error) {
      toastError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#f35d36]/20 focus:border-[#f35d36] outline-none transition-all text-sm text-gray-800 placeholder-gray-400";

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="authorName"
          placeholder="Name *"
          required
          value={formData.authorName}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          type="email"
          name="authorEmail"
          placeholder="Email *"
          required
          value={formData.authorEmail}
          onChange={handleChange}
          className={inputClass}
        />
      </div>
      <textarea
        name="content"
        rows={4}
        placeholder="Your comment here..."
        required
        value={formData.content}
        onChange={handleChange}
        className={`${inputClass} resize-none`}
      />
      
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="px-8 py-3 bg-[#f35d36] text-white font-bold rounded-lg hover:bg-[#d84e2a] transition-all disabled:opacity-70"
      >
        {isSubmitting ? 'Posting...' : buttonText}
      </button>
    </form>
  );
}