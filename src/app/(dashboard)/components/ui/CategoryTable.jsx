'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiTrash2, FiEdit, FiCheckCircle, FiCircle } from 'react-icons/fi';
import { Modal } from 'app/components/ui/Modal';

const StatusBadge = ({ status }) => {
  const isPublished = status === 'PUBLISHED';
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full ${
      isPublished 
        ? 'bg-green-50 text-green-700 border border-green-100' 
        : 'bg-gray-100 text-gray-600 border border-gray-200'
    }`}>
      {isPublished ? <FiCheckCircle size={10} /> : <FiCircle size={10} />}
      {isPublished ? 'Published' : 'Draft'}
    </span>
  );
};

export function CategoryTable({ 
  categories, 
  onDeleteCategory,
  selectedCategoryIds,
  onSelectAll,
  onSelectOne,
  currentPage,
  itemsPerPage,
  allSelectedOnPage,
  baseEditPath
}) {
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  
  const handleDeleteClick = (cat) => setCategoryToDelete(cat);
  
  const confirmDelete = () => {
    if (categoryToDelete) {
      onDeleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
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
              <th scope="col" className="px-6 py-3">Sl No</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Slug</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((cat, index) => (
              <tr key={cat.id} className="bg-white hover:bg-gray-50 transition-colors group">
                <td className="w-4 p-4">
                    <input 
                      type="checkbox"
                      className="custom-checkbox"
                      checked={selectedCategoryIds.includes(cat.id)}
                      onChange={(e) => onSelectOne(e, cat.id)}
                    />
                </td>
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-[#212c4a]">
                    {cat.name}
                </th>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                    /{cat.slug}
                </td>
                <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                    {cat.description || <span className="text-gray-300 italic">No description</span>}
                </td>
                <td className="px-6 py-4">
                    <StatusBadge status={cat.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link 
                      href={`${baseEditPath}/${cat.id}/edit`}
                      className="p-2 text-[#f35d36] bg-orange-50 rounded-lg transition-colors" 
                      title="Edit"
                    >
                      <FiEdit className="w-4 h-4" />
                    </Link>
                    <button 
                        onClick={() => handleDeleteClick(cat)} 
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

      {/* Delete Modal */}
      <Modal isOpen={!!categoryToDelete} onClose={() => setCategoryToDelete(null)} title="Delete Category">
        <div>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-bold text-[#212c4a]">{categoryToDelete?.name}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button 
                type="button" 
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors" 
                onClick={() => setCategoryToDelete(null)}
            >
                Cancel
            </button>
            <button 
                type="button" 
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-sm transition-colors" 
                onClick={confirmDelete}
            >
                Delete Category
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}