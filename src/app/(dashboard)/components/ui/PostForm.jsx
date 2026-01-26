'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiSave, FiImage, FiX, FiRefreshCw, FiGlobe, FiLayout, FiCheck } from 'react-icons/fi';
import { TinyMCEEditor } from 'app/components/TinyMCEEditor';
import { toastError, toastSuccess } from 'lib/toast';

export function PostForm({ onSave, initialData, isSaving }) {
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    categoryId: '',
    status: 'DRAFT',
    metaTitle: '',
    metaDescription: '',
    featuredImage: null,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/blog/admin/categories?limit=100'); 
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error(error);
        toastError("Could not load categories"); 
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        categoryId: initialData.categoryId || '', 
        featuredImage: initialData.featuredImage || null,
        metaTitle: initialData.metaTitle || '',
        metaDescription: initialData.metaDescription || '',
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData((prev) => ({ ...prev, slug }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { 
      toastError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      const uploadData = new FormData();
      uploadData.append('image', file);
      const apiUrl = process.env.NEXT_PUBLIC_MEDIA_API_URL || 'https://api.microters.com/upload';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) throw new Error('Image upload failed');

      const result = await response.json();
      const imageUrl = result.location || result.url;

      setFormData((prev) => ({ ...prev, featuredImage: imageUrl }));
      toastSuccess('Image uploaded successfully!');

    } catch (error) {
      console.error('Upload error:', error);
      toastError('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, featuredImage: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  const cardClass = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#f35d36]/20 focus:border-[#f35d36] outline-none transition-all text-sm text-gray-800 placeholder-gray-400";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
      
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-6">
        <div className={cardClass}>
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Post Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} className={`${inputClass} text-lg font-medium`} required />
            </div>
            <div>
              <label className={labelClass}>Slug</label>
              <div className="flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-100 text-gray-500 text-xs">/blog/</span>
                <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="flex-1 min-w-0 block w-full px-3 py-2 text-sm bg-white border border-gray-200 focus:ring-2 focus:ring-[#f35d36]/20 focus:border-[#f35d36] outline-none" />
                <button type="button" onClick={generateSlug} className="inline-flex items-center px-4 rounded-r-lg border border-l-0 border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-[#f35d36] text-xs font-medium transition-colors"><FiRefreshCw className="mr-1.5" /> Generate</button>
              </div>
            </div>
          </div>
        </div>

        <div className={cardClass}>
          <label className={labelClass}>Content</label>
          <div className="mt-2 min-h-[400px] border border-gray-200 rounded-lg overflow-hidden">
             <TinyMCEEditor value={formData.content} onEditorChange={handleEditorChange} />
          </div>
        </div>

        <div className={cardClass}>
           <label className={labelClass}>Excerpt</label>
           <textarea name="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} className={`${inputClass} resize-none`} />
        </div>

        <div className={cardClass}>
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
             <FiGlobe className="text-blue-600" /> <h3 className="font-semibold text-gray-800">SEO Settings</h3>
          </div>
          <div className="space-y-4">
             <input type="text" name="metaTitle" placeholder="Meta Title" value={formData.metaTitle} onChange={handleChange} className={inputClass} />
             <textarea name="metaDescription" placeholder="Meta Description" rows={3} value={formData.metaDescription} onChange={handleChange} className={`${inputClass} resize-none`} />
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-1 space-y-6 h-fit">
        <div className={cardClass}>
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><FiLayout className="text-[#f35d36]" /> Publishing</h3>
          <div className="space-y-4">
             <select name="status" value={formData.status} onChange={handleChange} className={inputClass}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
             </select>
             <button type="submit" disabled={isSaving || isUploading} className="w-full flex items-center justify-center gap-2 bg-[#f35d36] hover:bg-[#d84e2a] text-white py-2.5 rounded-lg font-medium transition-all disabled:opacity-70">
                {isSaving ? 'Saving...' : <><FiSave /> Save Post</>}
             </button>
          </div>
        </div>

        <div className={cardClass}>
          <h3 className="font-semibold text-gray-800 mb-4">Category</h3>
          {isLoadingCategories ? <p className="text-xs">Loading...</p> : (
            <div className="space-y-1 max-h-56 overflow-y-auto">
               {categories.map((cat) => (
                  <label key={cat.id} className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer ${formData.categoryId === cat.id ? 'bg-orange-50 border-orange-100' : 'hover:bg-gray-50'}`}>
                     <input type="radio" name="categoryId" value={cat.id} checked={formData.categoryId === cat.id} onChange={handleChange} className="text-[#f35d36] focus:ring-[#f35d36]" />
                     <span className="text-sm text-gray-600">{cat.name}</span>
                  </label>
               ))}
            </div>
          )}
        </div>

        <div className={cardClass}>
           <h3 className="font-semibold text-gray-800 mb-4">Featured Image</h3>
           <div className="relative border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-all group">
              {isUploading && <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center text-xs text-[#f35d36]">Uploading...</div>}
              
              {formData.featuredImage ? (
                 <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    <Image src={formData.featuredImage} alt="Featured" fill className="object-cover" />
                    <button type="button" onClick={removeImage} className="absolute top-2 right-2 p-1.5 bg-white text-red-500 rounded-full shadow-md hover:scale-110"><FiX /></button>
                 </div>
              ) : (
                 <label className="flex flex-col items-center justify-center p-6 cursor-pointer">
                    <FiImage className="w-8 h-8 text-gray-300 mb-2" />
                    <span className="text-sm text-gray-500">Upload Image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                 </label>
              )}
           </div>
        </div>
      </div>
    </form>
  );
}