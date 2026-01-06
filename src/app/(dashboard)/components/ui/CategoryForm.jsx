'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FiSave, FiX, FiRefreshCw, FiGlobe, FiLayout, FiChevronDown } from 'react-icons/fi';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') 
    .replace(/[^\w\-]+/g, '') 
    .replace(/\-\-+/g, '-');

export function CategoryForm({ onSave, initialData, isSaving }) {
  const router = useRouter();
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm({
    defaultValues: { status: 'DRAFT', ...initialData }
  });
  
  const isEditMode = !!initialData;
  const nameValue = watch('name');
  const metaTitleValue = watch('metaTitle') || '';
  const metaDescValue = watch('metaDescription') || '';

  useEffect(() => {
    if (nameValue && !isEditMode) {
      setValue('slug', slugify(nameValue), { shouldValidate: true });
    }
  }, [nameValue, isEditMode, setValue]);

  const handleRegenerateSlug = () => {
    if (nameValue) setValue('slug', slugify(nameValue));
  };

  const inputClass = "w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#f35d36]/20 focus:border-[#f35d36] outline-none transition-all text-sm text-slate-800 placeholder-slate-400";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-1.5";
  const cardClass = "bg-white p-6 rounded-xl border border-slate-200 shadow-sm";

  return (
    <form onSubmit={handleSubmit(onSave)} className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10">
      
      {/* --- LEFT COLUMN (Main Content) --- */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* General Info Card */}
        <div className={cardClass}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-50">
            <FiLayout className="text-slate-400" />
            <h3 className="font-semibold text-slate-800">General Information</h3>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className={labelClass}>Category Name <span className="text-red-500">*</span></label>
              <input 
                id="name" 
                {...register('name', { required: "Name is required" })}
                placeholder="e.g. Digital Marketing"
                className={inputClass}
              />
              {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name.message}</span>}
            </div>

            <div>
              <label htmlFor="slug" className={labelClass}>URL Slug <span className="text-red-500">*</span></label>
              <div className="flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-100 text-slate-500 text-xs">
                  /category/
                </span>
                <input 
                  id="slug" 
                  {...register('slug', { required: "Slug is required" })}
                  className={`${inputClass} rounded-l-none rounded-r-none`}
                />
                <button 
                  type="button" 
                  onClick={handleRegenerateSlug}
                  className="inline-flex items-center px-3 rounded-r-lg border border-l-0 border-slate-200 bg-slate-50 text-slate-500 hover:text-[#f35d36] hover:bg-slate-100 transition-colors"
                  title="Regenerate Slug"
                >
                  <FiRefreshCw />
                </button>
              </div>
              {errors.slug && <span className="text-xs text-red-500 mt-1">{errors.slug.message}</span>}
            </div>

            <div>
              <label htmlFor="description" className={labelClass}>Description</label>
              <textarea 
                id="description" 
                {...register('description')} 
                rows={4} 
                placeholder="Briefly describe what this category covers..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </div>

        {/* SEO Settings Card */}
        <div className={cardClass}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-50">
            <FiGlobe className="text-slate-400" />
            <h3 className="font-semibold text-slate-800">Search Engine Optimization (SEO)</h3>
          </div>
          
          <div className="space-y-5">
            <div>
              <div className="flex justify-between">
                <label htmlFor="metaTitle" className={labelClass}>Meta Title</label>
                <span className={`text-xs ${metaTitleValue.length > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                   {metaTitleValue.length}/60
                </span>
              </div>
              <input 
                id="metaTitle" 
                {...register('metaTitle')} 
                placeholder="SEO Title appearing in Google"
                className={inputClass}
              />
            </div>

            <div>
              <div className="flex justify-between">
                <label htmlFor="metaDescription" className={labelClass}>Meta Description</label>
                <span className={`text-xs ${metaDescValue.length > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                   {metaDescValue.length}/160
                </span>
              </div>
              <textarea 
                id="metaDescription" 
                {...register('metaDescription')} 
                rows={3}
                placeholder="SEO Description appearing in Google results..."
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN (Sidebar) --- */}
      <div className="lg:col-span-1 space-y-6">
        
        {/* Publish / Actions Card */}
        <div className={cardClass}>
          <h3 className="font-semibold text-slate-800 mb-4">Publishing</h3>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Visibility</label>
              <div className="relative">
                <select 
                    {...register('status')}
                    className={`${inputClass} appearance-none cursor-pointer`}
                >
                    <option value="DRAFT">Hidden (Draft)</option>
                    <option value="PUBLISHED">Visible (Published)</option>
                </select>
                {/* Custom Arrow Icon */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <FiChevronDown />
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button 
                type="submit" 
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#f35d36] hover:bg-[#d84e2a] text-white rounded-lg font-medium shadow-md shadow-orange-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                    <span className="flex items-center gap-2">Saving...</span>
                ) : (
                    <>
                      <FiSave className="w-4 h-4" /> 
                      {isEditMode ? 'Update Category' : 'Save Category'}
                    </>
                )}
              </button>

              <button 
                type="button" 
                onClick={() => router.back()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
              >
                <FiX className="w-4 h-4" /> Cancel
              </button>
            </div>
          </div>
        </div>

        {/* Helper / Tips Card */}
        <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
           <h4 className="text-blue-800 font-semibold text-sm mb-2">Pro Tip</h4>
           <p className="text-blue-600/80 text-xs leading-relaxed">
             Categories with clear, keyword-rich descriptions tend to rank better in search engines. Keep your slugs short and readable.
           </p>
        </div>

      </div>
    </form>
  );
}