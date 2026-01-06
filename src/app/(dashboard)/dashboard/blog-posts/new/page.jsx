'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PostForm } from 'app/(dashboard)/components/ui/PostForm';
import { toastError, toastSuccess } from 'lib/toast';
import PageHeading from 'app/components/ui/PageHeading';
export default function NewPostPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePost = async (postData) => {
    try {
      setIsSaving(true);
      
      const response = await fetch('/api/blog/admin/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to save post.');
      }
      
      // Success Feedback
      console.log('Post created successfully!');
      toastSuccess('Post created successfully!'); 
      router.push('/dashboard/blog-posts');
      
    } catch (error) {
      console.error(error);
      toastError(error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Blog", href: "/dashboard/blog-posts" },
    { label: "New Post" } 
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeading 
        title="Add New Post" 
        breadcrumbs={breadcrumbs}
      />

      {/* Main Form Component */}
      <PostForm
         onSave={handleSavePost} 
         isSaving={isSaving}
      />
    </div>
  );
}