'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { API_URLS } from '@/lib/api-config';
import { authFetch } from '@/lib/auth-fetch';

interface ShopProduct {
  title: string;
  description: string;
  logo_src: string;
  logo_alt: string;
  order_index: number;
  website_url?: string;
}

export default function ShopProductsAdmin() {
  const [shopProducts, setShopProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const itemHeightsRef = useRef<Record<number, number>>({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selected, setSelected] = useState<ShopProduct | null>(null);
  const [form, setForm] = useState<{ title: string; description: string; logo_src: string; logo_alt: string; website_url: string } | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState<{ title: string; description: string; logo_src: string; logo_alt: string; website_url: string } | null>(null);
  const [editLogoMode, setEditLogoMode] = useState<'upload' | 'url'>('upload');
  const [addLogoMode, setAddLogoMode] = useState<'upload' | 'url'>('upload');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleFileDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const base64 = await fileToBase64(file);
      if (editLogoMode === 'upload' && editModalOpen && form) {
        setForm({ ...form, logo_src: base64 });
      } else if (addLogoMode === 'upload' && addModalOpen && addForm) {
        setAddForm({ ...addForm, logo_src: base64 });
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const base64 = await fileToBase64(file);
      if (editLogoMode === 'upload' && editModalOpen && form) {
        setForm({ ...form, logo_src: base64 });
      } else if (addLogoMode === 'upload' && addModalOpen && addForm) {
        setAddForm({ ...addForm, logo_src: base64 });
      }
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API_URLS.SHOP_PRODUCTS, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load shop products API status=${res.status}`);
        const json = await res.json();
        const list: ShopProduct[] = Array.isArray(json?.shopProducts)
          ? json.shopProducts.map((p: any) => ({
              title: p.title,
              description: p.description ?? '',
              logo_src: p.logo_src,
              logo_alt: p.logo_alt ?? p.title,
              order_index: p.order_index ?? 1,
              website_url: p.website_url,
            }))
          : [];
        setShopProducts(list);
        setError(null);
      } catch (err) {
        console.error('Load error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
  };

  const handleDragOver = (e: React.DragEvent, targetIndex?: number) => {
    e.preventDefault();
    if (draggedIndex === null || targetIndex === undefined || draggedIndex === targetIndex) return;
    const next = [...shopProducts];
    const [moved] = next.splice(draggedIndex, 1);
    next.splice(targetIndex, 0, moved);
    setShopProducts(next);
    setDraggedIndex(targetIndex);
  };

  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    
    setIsUpdating(true);
    try {
      // Update order indexes based on current array order
      const updatedProducts = shopProducts.map((p, idx) => ({ ...p, order_index: idx + 1 }));
      
      // Update order via API
      const res = await authFetch(API_URLS.SHOP_PRODUCTS, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopProducts: updatedProducts })
      });
      
      if (res.ok) {
        const json = await res.json();
        setShopProducts(json.shopProducts);
        console.log('[Shop DragDrop] Updated list:', json.shopProducts);
      } else {
        console.error('Failed to update shop products order');
      }
    } catch (error) {
      console.error('Error updating shop products order:', error);
    } finally {
      setIsUpdating(false);
      setDraggedIndex(null);
    }
  };

  const handleDragEnd = () => setDraggedIndex(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="text-green-600 hover:text-green-700 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Shop Products Management</h1>
              <p className="text-gray-600 mt-2">UI demo only (drag to reorder, edit/delete via modal)</p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                onClick={() => { setAddForm({ title: '', description: '', logo_src: '', logo_alt: '', website_url: '' }); setAddModalOpen(true); }}
              >
                Add New
              </button>
            </div>
          </div>

          {/* Products List with Drag & Drop (UI only) */}
          <div className="space-y-2 relative">
            {isUpdating && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="flex items-center space-x-3 bg-white px-6 py-4 rounded-lg shadow-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
                  <span className="text-gray-700 font-medium">Updating order...</span>
                </div>
              </div>
            )}
            {shopProducts.map((product, index) => (
              <motion.div
                key={`${product.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`relative border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all ${draggedIndex === index ? 'opacity-50' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, index)}
                onDragOver={(e) => handleDragOver(e as unknown as React.DragEvent, index)}
                onDrop={(e) => handleDrop(e as unknown as React.DragEvent, index)}
                onDragEnd={handleDragEnd}
                ref={(el) => { if (el && el instanceof HTMLElement) itemHeightsRef.current[index] = el.offsetHeight; }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">{product.order_index}</div>
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center cursor-move">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                      </div>
                    </div>
                    <img src={product.logo_src} alt={product.logo_alt} className="w-16 h-16 object-contain border border-gray-200 rounded" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
                      <p className="text-sm text-gray-600 max-w-xl">{product.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => {
                        setSelected(product);
                        setForm({ title: product.title, description: product.description, logo_src: product.logo_src, logo_alt: product.logo_alt, website_url: product.website_url || '' });
                        setEditModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                      onClick={() => { setSelected(product); setDeleteModalOpen(true); }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Edit Modal */}
          {editModalOpen && selected && form && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Edit Product</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo *</label>
                    <div className="flex space-x-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setEditLogoMode('upload')}
                        className={`px-3 py-1 text-xs rounded ${
                          editLogoMode === 'upload'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditLogoMode('url')}
                        className={`px-3 py-1 text-xs rounded ${
                          editLogoMode === 'url'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Paste URL
                      </button>
                    </div>
                    
                    {editLogoMode === 'upload' ? (
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center ${
                          isDragOver ? 'border-green-500 bg-green-50' : 'border-gray-300'
                        }`}
                        onDragOver={handleFileDragOver}
                        onDragLeave={handleFileDragLeave}
                        onDrop={handleFileDrop}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          ref={fileInputRef}
                        />
                        {form.logo_src ? (
                          <div className="flex flex-col items-center space-y-2">
                            <img
                              src={form.logo_src}
                              alt="Selected"
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                              >
                                Change File
                              </button>
                              <button
                                type="button"
                                onClick={() => setForm({ ...form, logo_src: '' })}
                                className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Choose File
                          </button>
                        )}
                      </div>
                    ) : (
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="https://example.com/logo.png"
                        value={form.logo_src}
                        onChange={(e) => setForm({ ...form, logo_src: e.target.value })}
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo Alt *</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={form.logo_alt} onChange={(e) => setForm({ ...form, logo_alt: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website URL *</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} placeholder="https://example.com" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => { setEditModalOpen(false); setSelected(null); }}>Cancel</button>
                  <button
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isEditing}
                    onClick={async () => {
                      if (!selected || !form) return;
                      
                      // Validation
                      if (!form.title.trim()) {
                        alert('Title is required');
                        return;
                      }
                      if (!form.description.trim()) {
                        alert('Description is required');
                        return;
                      }
                      if (!form.logo_src.trim()) {
                        alert('Logo is required');
                        return;
                      }
                      if (!form.logo_alt.trim()) {
                        alert('Logo Alt text is required');
                        return;
                      }
                      if (!form.website_url.trim()) {
                        alert('Website URL is required');
                        return;
                      }
                      
                      // URL validation
                      try {
                        new URL(form.website_url);
                      } catch {
                        alert('Please enter a valid URL (e.g., https://example.com)');
                        return;
                      }
                      
                      setIsEditing(true);
                      try {
                        // Find the index of the selected product
                        const selectedIndex = shopProducts.findIndex(p => p.title === selected.title);
                        if (selectedIndex === -1) return;
                        
                        // Update the product in the array
                        const updatedProducts = [...shopProducts];
                        updatedProducts[selectedIndex] = {
                          ...updatedProducts[selectedIndex],
                          ...form,
                          order_index: updatedProducts[selectedIndex].order_index
                        };
                        
                        // Send entire array to API
                        const res = await authFetch(API_URLS.SHOP_PRODUCTS, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ shopProducts: updatedProducts })
                        });
                        
                        if (res.ok) {
                          setShopProducts(updatedProducts);
                          setEditModalOpen(false);
                          setSelected(null);
                        } else {
                          console.error('Failed to update shop product');
                        }
                      } catch (error) {
                        console.error('Error updating shop product:', error);
                      } finally {
                        setIsEditing(false);
                      }
                    }}
                  >
                    {isEditing ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </div>
                    ) : (
                      'Save'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirm Modal */}
          {deleteModalOpen && selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <h3 className="text-xl font-semibold mb-3">Delete Product</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete "{selected.title}"?</p>
                <div className="flex justify-end gap-2">
                  <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => { setDeleteModalOpen(false); setSelected(null); }}>Cancel</button>
                  <button
                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isDeleting}
                    onClick={async () => {
                      if (!selected) return;
                      
                      setIsDeleting(true);
                      try {
                        // Remove the selected product from array
                        const filtered = shopProducts.filter((p) => p.title !== selected.title);
                        
                        // Update order_index for remaining products
                        const updatedProducts = filtered.map((p, idx) => ({
                          ...p,
                          order_index: idx + 1
                        }));
                        
                        // Send updated array to API
                        const res = await authFetch(API_URLS.SHOP_PRODUCTS, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ shopProducts: updatedProducts })
                        });
                        
                        if (res.ok) {
                          setShopProducts(updatedProducts);
                          setDeleteModalOpen(false);
                          setSelected(null);
                        } else {
                          console.error('Failed to delete shop product');
                        }
                      } catch (error) {
                        console.error('Error deleting shop product:', error);
                      } finally {
                        setIsDeleting(false);
                      }
                    }}
                  >
                    {isDeleting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Deleting...
                      </div>
                    ) : (
                      'Delete'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Modal */}
          {addModalOpen && addForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Add Product</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={addForm.title} onChange={(e) => setAddForm({ ...addForm, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" rows={3} value={addForm.description} onChange={(e) => setAddForm({ ...addForm, description: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo *</label>
                    <div className="flex space-x-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setAddLogoMode('upload')}
                        className={`px-3 py-1 text-xs rounded ${
                          addLogoMode === 'upload'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setAddLogoMode('url')}
                        className={`px-3 py-1 text-xs rounded ${
                          addLogoMode === 'url'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Paste URL
                      </button>
                    </div>
                    
                    {addLogoMode === 'upload' ? (
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center ${
                          isDragOver ? 'border-green-500 bg-green-50' : 'border-gray-300'
                        }`}
                        onDragOver={handleFileDragOver}
                        onDragLeave={handleFileDragLeave}
                        onDrop={handleFileDrop}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                          ref={fileInputRef}
                        />
                        {addForm.logo_src ? (
                          <div className="flex flex-col items-center space-y-2">
                            <img
                              src={addForm.logo_src}
                              alt="Selected"
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex space-x-2">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600"
                              >
                                Change File
                              </button>
                              <button
                                type="button"
                                onClick={() => setAddForm({ ...addForm, logo_src: '' })}
                                className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Choose File
                          </button>
                        )}
                      </div>
                    ) : (
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="https://example.com/logo.png"
                        value={addForm.logo_src}
                        onChange={(e) => setAddForm({ ...addForm, logo_src: e.target.value })}
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo Alt *</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={addForm.logo_alt} onChange={(e) => setAddForm({ ...addForm, logo_alt: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website URL *</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" value={addForm.website_url} onChange={(e) => setAddForm({ ...addForm, website_url: e.target.value })} placeholder="https://example.com" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => setAddModalOpen(false)}>Cancel</button>
                  <button
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isAdding}
                    onClick={async () => {
                      if (!addForm) return;
                      
                      // Validation
                      if (!addForm.title.trim()) {
                        alert('Title is required');
                        return;
                      }
                      if (!addForm.description.trim()) {
                        alert('Description is required');
                        return;
                      }
                      if (!addForm.logo_src.trim()) {
                        alert('Logo is required');
                        return;
                      }
                      if (!addForm.logo_alt.trim()) {
                        alert('Logo Alt text is required');
                        return;
                      }
                      if (!addForm.website_url.trim()) {
                        alert('Website URL is required');
                        return;
                      }
                      
                      // URL validation
                      try {
                        new URL(addForm.website_url);
                      } catch {
                        alert('Please enter a valid URL (e.g., https://example.com)');
                        return;
                      }
                      
                      setIsAdding(true);
                      try {
                        // Create new product object
                        const newProduct = {
                          title: addForm.title,
                          description: addForm.description,
                          logo_src: addForm.logo_src,
                          logo_alt: addForm.logo_alt,
                          website_url: addForm.website_url,
                          order_index: shopProducts.length + 1
                        };
                        
                        // Add to local array immediately
                        const updatedProducts = [...shopProducts, newProduct];
                        setShopProducts(updatedProducts);
                        
                        // Update backend with entire array
                        const res = await authFetch(API_URLS.SHOP_PRODUCTS, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ shopProducts: updatedProducts })
                        });
                        
                        if (res.ok) {
                          setAddModalOpen(false);
                          setAddForm(null);
                        } else {
                          console.error('Failed to create shop product');
                          // Revert local changes if API fails
                          setShopProducts(shopProducts);
                        }
                      } catch (error) {
                        console.error('Error creating shop product:', error);
                        // Revert local changes if API fails
                        setShopProducts(shopProducts);
                      } finally {
                        setIsAdding(false);
                      }
                    }}
                  >
                    {isAdding ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Adding...
                      </div>
                    ) : (
                      'Add'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// Helper nextId
function nextId(arr: { id: number }[]) {
  return arr.reduce((m, p) => Math.max(m, p.id), 0) + 1;
}


