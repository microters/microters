'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { toastError, toastSuccess } from 'lib/toast';
import PageHeading from 'app/components/ui/PageHeading';
import { CategoryForm } from 'app/(dashboard)/components/ui/CategoryForm';

export default function EditCategoryPage({ params }) {
  const router = useRouter();
  
  // 👈 2. Unwrap the params Promise using React.use()
  const { id } = use(params); 

  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Fetch Existing Data on Mount
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return; // Guard clause

      try {
        const res = await fetch(`/api/blog/admin/categories/${id}`);
        if (!res.ok) throw new Error('Category not found');
        
        const data = await res.json();
        setInitialData(data);
      } catch (error) {
        console.error(error);
        toastError('Failed to load category data.');
        router.push('/dashboard/blog-categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [id, router]);

  // 2. Handle Update Logic (PUT)
  const handleUpdateCategory = async (formData) => {
    try {
      setIsSaving(true);
      const response = await fetch(`/api/blog/admin/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update category.');
      }

      toastSuccess('Category updated successfully!');
      router.push('/dashboard/blog-categories');
    } catch (error) {
      toastError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const breadcrumbs = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Categories", href: "/dashboard/blog-categories" },
    { label: "Edit Category" }
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
      <PageHeading
        title="Edit Category"
        breadcrumbs={breadcrumbs}
      />
      
      <CategoryForm 
        initialData={initialData} 
        onSave={handleUpdateCategory} 
        isSaving={isSaving} 
      />
    </div>
  );
}