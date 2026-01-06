'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiSave, FiImage, FiX, FiRefreshCw, FiGlobe, FiLayout, FiCheck } from 'react-icons/fi';
import { TinyMCEEditor } from 'app/components/TinyMCEEditor';

export function PostForm({ onSave, categoryApiEndpoint, isSaving }) {
  // 1. Form State
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

  // Mock Categories
  const [categories, setCategories] = useState([
    { id: '1', name: 'Technology' },
    { id: '2', name: 'Digital Marketing' },
    { id: '3', name: 'SEO Tips' },
    { id: '4', name: 'Business Strategy' },
    { id: '5', name: 'Web Development' },
  ]);

  // 2. Handlers
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, featuredImage: objectUrl }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, featuredImage: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(formData);
  };

  // Reusable Styles
  const cardClass = "bg-white p-6 rounded-xl border border-gray-100 shadow-sm transition-shadow hover:shadow-md";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";
  const inputClass = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#f35d36]/20 focus:border-[#f35d36] outline-none transition-all text-sm text-gray-800 placeholder-gray-400";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
      
      {/* --- LEFT COLUMN: MAIN CONTENT --- */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Title & Slug */}
        <div className={cardClass}>
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Post Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter an engaging post title..."
                className={`${inputClass} text-lg font-medium`}
                required
              />
            </div>
            
            <div>
              <label className={labelClass}>Slug</label>
              <div className="flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-100 text-gray-500 text-xs">
                  /blog/
                </span>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="post-url-slug"
                  className="flex-1 min-w-0 block w-full px-3 py-2 text-sm bg-white border border-gray-200 focus:ring-2 focus:ring-[#f35d36]/20 focus:border-[#f35d36] outline-none text-gray-800"
                />
                <button 
                  type="button" 
                  onClick={generateSlug}
                  className="inline-flex items-center px-4 rounded-r-lg border border-l-0 border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-[#f35d36] text-xs font-medium transition-colors"
                >
                  <FiRefreshCw className="mr-1.5" /> Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className={cardClass}>
          <label className={labelClass}>Content</label>
          <div className="mt-2 min-h-[400px] border border-gray-200 rounded-lg overflow-hidden">
             <TinyMCEEditor
                value={formData.content} 
                onEditorChange={handleEditorChange} 
             />
          </div>
        </div>

        {/* Excerpt */}
        <div className={cardClass}>
          <div className="flex justify-between items-center mb-1.5">
            <label className={labelClass}>Excerpt</label>
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Optional</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">A short summary visible on cards and search results.</p>
          <textarea
            name="excerpt"
            rows={3}
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Write a short summary..."
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* SEO Configuration */}
        <div className={cardClass}>
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-gray-100">
            <div className="p-1.5 bg-blue-50 rounded-md text-blue-600">
              <FiGlobe />
            </div>
            <h3 className="font-semibold text-gray-800">SEO Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between">
                <label className={labelClass}>Meta Title</label>
                <span className={`text-xs ${formData.metaTitle.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                    {formData.metaTitle.length}/60
                </span>
              </div>
              <input
                type="text"
                name="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <div className="flex justify-between">
                 <label className={labelClass}>Meta Description</label>
                 <span className={`text-xs ${formData.metaDescription.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                    {formData.metaDescription.length}/160
                 </span>
              </div>
              <textarea
                name="metaDescription"
                rows={3}
                value={formData.metaDescription}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: SIDEBAR (NOT STICKY) --- */}
      <div className="lg:col-span-1 space-y-6 h-fit">
        
        {/* Publish Actions */}
        <div className={cardClass}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
            <div className="p-1.5 bg-orange-50 rounded-md text-[#f35d36]">
               <FiLayout />
            </div>
            <h3 className="font-semibold text-gray-800">Publishing</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Status</label>
              <div className="relative">
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`${inputClass} appearance-none cursor-pointer`}
                >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published</option>
                    <option value="ARCHIVED">Archived</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="group relative w-full flex items-center justify-center gap-2 bg-[#f35d36] hover:bg-[#d84e2a] text-white py-2.5 rounded-lg font-medium shadow-md shadow-orange-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                     <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                     Saving...
                  </span>
                ) : (
                  <>
                    <FiSave className="w-4 h-4" /> Save Post
                  </>
                )}
              </button>
            </div>
            
            <div className="text-center">
                <p className="text-xs text-gray-400">
                    {formData.status === 'PUBLISHED' ? 'Post will be visible instantly' : 'Hidden from public view'}
                </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className={cardClass}>
          <h3 className="font-semibold text-gray-800 mb-4">Category</h3>
          <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
            {categories.map((cat) => (
              <label 
                key={cat.id} 
                className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                    formData.categoryId === cat.id ? 'bg-orange-50 border border-orange-100' : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <div className="relative flex items-center">
                    <input
                    type="radio"
                    name="categoryId"
                    value={cat.id}
                    checked={formData.categoryId === cat.id}
                    onChange={handleChange}
                    className="peer appearance-none w-4 h-4 border border-gray-300 rounded-full checked:border-[#f35d36] checked:border-4 transition-all"
                    />
                </div>
                <span className={`text-sm ${formData.categoryId === cat.id ? 'text-[#f35d36] font-medium' : 'text-gray-600'}`}>
                    {cat.name}
                </span>
                {formData.categoryId === cat.id && <FiCheck className="ml-auto text-[#f35d36] w-4 h-4" />}
              </label>
            ))}
          </div>
          {categories.length === 0 && (
            <p className="text-xs text-gray-400 italic text-center py-2">No categories found.</p>
          )}
        </div>

        {/* Featured Image */}
        <div className={cardClass}>
          <h3 className="font-semibold text-gray-800 mb-4">Featured Image</h3>
          
          <div className="border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 hover:bg-gray-50 hover:border-[#f35d36]/50 transition-all relative group cursor-pointer">
            {formData.featuredImage ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image 
                  src={formData.featuredImage} 
                  alt="Featured" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                    type="button"
                    onClick={removeImage}
                    className="p-2 bg-white text-red-500 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                        <FiX size={18} />
                    </button>
                </div>
              </div>
            ) : (
              <label className="block w-full h-full cursor-pointer p-6">
                <div className="flex flex-col items-center justify-center">
                  <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300">
                    <FiImage className="w-6 h-6 text-[#f35d36]" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Click to upload</span>
                  <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageUpload}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}