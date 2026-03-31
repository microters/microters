'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiTrash2, FiEdit, FiCheckCircle, FiCircle, FiEyeOff, FiImage } from 'react-icons/fi';
import { Modal } from 'app/components/ui/Modal';

const StatusBadge = ({ status }) => {
  if (status === 'PUBLISHED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-50 text-green-700 border border-green-100">
        <FiCheckCircle size={10} /> Published
      </span>
    );
  }
  if (status === 'ARCHIVED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-600 border border-gray-200">
        <FiEyeOff size={10} /> Archived
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-orange-50 text-orange-700 border border-orange-100">
      <FiCircle size={10} /> Draft
    </span>
  );
};

export function PostTable({ 
  posts, 
  onDeletePost,
  selectedPostIds,
  onSelectAll,
  onSelectOne,
  allSelectedOnPage
}) {
  const [postToDelete, setPostToDelete] = useState(null);
  
  const confirmDelete = () => {
    if (postToDelete) {
      onDeletePost(postToDelete.id);
      setPostToDelete(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-50/50 text-gray-500 font-semibold">
            <tr>
              <th scope="col" className="p-4 w-4">
                <input 
                  type="checkbox"
                  className="custom-checkbox"
                  onChange={onSelectAll}
                  checked={allSelectedOnPage}
                />
              </th>
              <th className="px-6 py-3">Post</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {posts.map((post) => (
              <tr key={post.id} className="bg-white hover:bg-gray-50 transition-colors group">
                <td className="w-4 p-4">
                    <input 
                      type="checkbox"
                      className="custom-checkbox"
                      checked={selectedPostIds.includes(post.id)}
                      onChange={(e) => onSelectOne(e, post.id)}
                    />
                </td>
                
                {/* Post Title & Image */}
                <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                            {post.featuredImage ? (
                                <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-gray-300">
                                    <FiImage />
                                </div>
                            )}
                        </div>
                        <div>
                            <Link 
                              href={`/blog/${post.slug}`} 
                              target="_blank"
                              className="font-medium text-[#212c4a] line-clamp-1 hover:text-[#f35d36] hover:underline transition-colors"
                            >
                              {post.title}
                            </Link>
                            <div className="text-xs text-gray-400 font-mono">/{post.slug}</div>
                        </div>
                    </div>
                </td>

                <td className="px-6 py-4 text-gray-500">
                   {post.category ? (
                     <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                        {post.category.name}
                     </span>
                   ) : <span className="text-gray-400 italic">Uncategorized</span>}
                </td>
                
                <td className="px-6 py-4">
                    <StatusBadge status={post.status} />
                </td>

                <td className="px-6 py-4 text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`/dashboard/blog-posts/${post.id}/edit`}
                      className="p-2 text-[#f35d36] bg-orange-50 rounded-lg transition-colors" 
                      title="Edit"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Link>
                    <button 
                        onClick={() => setPostToDelete(post)} 
                        className="p-2 text-red-600 bg-red-50 rounded-lg transition-colors" 
                        title="Delete"
                    >
                        <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!postToDelete} onClose={() => setPostToDelete(null)} title="Delete Post">
        <div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-bold text-[#212c4a]">{postToDelete?.title}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button 
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg" 
                onClick={() => setPostToDelete(null)}
            >
                Cancel
            </button>
            <button 
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm" 
                onClick={confirmDelete}
            >
                Delete Post
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}