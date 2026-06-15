"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { toastError, toastSuccess } from "lib/toast";
import PageHeading from "app/components/ui/PageHeading";
import { PostForm } from "app/(dashboard)/components/ui/PostForm";

export default function EditPostPage({ params }) {
  const router = useRouter();
  const { id } = use(params);

  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/admin/posts/${id}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setInitialData(data);
      } catch (error) {
        toastError("Failed to load post.");
        router.push("/dashboard/blog-posts");
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchPost();
  }, [id, router]);

  const handleUpdatePost = async (formData) => {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/blog/admin/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update post.");

      toastSuccess("Post updated successfully!");
      router.push("/dashboard/blog-posts");
    } catch (error) {
      toastError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Posts", href: "/dashboard/blog-posts" },
    { label: "Edit Post" },
  ];

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#f35d36] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeading title="Edit Post" breadcrumbs={breadcrumbs} />
      <PostForm
        onSave={handleUpdatePost}
        isSaving={isSaving}
        initialData={initialData}
      />
    </div>
  );
}
