'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { API_URLS } from '@/lib/api-config';
import { authFetch } from '@/lib/auth-fetch';

interface Partner {
  name: string;
  logo_src: string;
  website_url?: string;
  alt_text?: string;
  order_index: number;
}

export default function PartnersAdmin() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const itemHeightsRef = useRef<Record<number, number>>({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selected, setSelected] = useState<Partner | null>(null);
  const [form, setForm] = useState<{ name: string; logo_src: string; website_url: string; alt_text: string } | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState<{ name: string; logo_src: string; website_url: string; alt_text: string } | null>(null);
  const [logoInputType, setLogoInputType] = useState<'upload' | 'url'>('upload');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
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
      setSelectedFile(base64);
      if (logoInputType === 'upload') {
        if (editModalOpen && form) {
          setForm({ ...form, logo_src: base64 });
        } else if (addModalOpen && addForm) {
          setAddForm({ ...addForm, logo_src: base64 });
        }
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const base64 = await fileToBase64(file);
      setSelectedFile(base64);
      if (logoInputType === 'upload') {
        if (editModalOpen && form) {
          setForm({ ...form, logo_src: base64 });
        } else if (addModalOpen && addForm) {
          setAddForm({ ...addForm, logo_src: base64 });
        }
      }
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (logoInputType === 'upload') {
      if (editModalOpen && form) {
        setForm({ ...form, logo_src: '' });
      } else if (addModalOpen && addForm) {
        setAddForm({ ...addForm, logo_src: '' });
      }
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API_URLS.PARTNERS, { cache: 'no-store' });
        if (!res.ok) throw new Error(`Failed to load partners API status=${res.status}`);
        const json = await res.json();
        const list: Partner[] = Array.isArray(json?.partners)
          ? json.partners.map((p: any) => ({
              name: p.name,
              logo_src: p.logo_src,
              website_url: p.website_url ?? '',
              alt_text: p.alt_text ?? p.name,
              order_index: p.order_index ?? 1,
            }))
          : [];
        setPartners(list);
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

    const next = [...partners];
    const [moved] = next.splice(draggedIndex, 1);
    next.splice(targetIndex, 0, moved);
    setPartners(next);
    setDraggedIndex(targetIndex);
  };

  console.log({partners});
  const handleDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    
    console.log('Starting drag drop update...');
    setIsUpdating(true);
    try {
      // Update order indexes based on current array order
      const updatedPartners = partners.map((p, idx) => ({ ...p, order_index: idx + 1 }));
      
      // Update order via API
      const res = await authFetch(API_URLS.PARTNERS, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partners: updatedPartners })
      });
      
      if (res.ok) {
        const json = await res.json();
        setPartners(json.partners);
        console.log('[Partners DragDrop] Updated list:', json.partners);
      } else {
        console.error('Failed to update partners order');
      }
    } catch (error) {
      console.error('Error updating partners order:', error);
    } finally {
      console.log('Ending drag drop update...');
      setIsUpdating(false);
      setDraggedIndex(null);
    }
  };

  const handleDragEnd = () => setDraggedIndex(null);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading partners...</p>
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
              <Link href="/admin" className="text-blue-500 hover:text-blue-600 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Partners Management</h1>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => {
                  setAddForm({ name: '', logo_src: '', website_url: '', alt_text: '' });
                  setAddModalOpen(true);
                }}
              >
                Add New
              </button>
            </div>
          </div>
          {/* Partners List with Drag & Drop (UI only) */}
          <div className="space-y-2 relative">
            {isUpdating && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="flex items-center space-x-3 bg-white px-6 py-4 rounded-lg shadow-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  <span className="text-gray-700 font-medium">Updating order...</span>
                </div>
              </div>
            )}
            {partners.map((partner, index) => (
              <motion.div
                key={`${partner.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`relative border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all ${draggedIndex === index ? 'opacity-50' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e as unknown as React.DragEvent, index)}
                onDragOver={(e) => handleDragOver(e as unknown as React.DragEvent, index)}
                onDrop={(e) => handleDrop(e as unknown as React.DragEvent, index)}
                onDragEnd={handleDragEnd}
                ref={(el) => {
                  if (el && el instanceof HTMLElement) itemHeightsRef.current[index] = el.offsetHeight;
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-600">
                        {partner.order_index}
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center cursor-move">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                      </div>
                    </div>
                    <img
                      src={partner.logo_src}
                      alt={partner.alt_text}
                      className="w-16 h-16 object-contain border border-gray-200 rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                      <p className="text-sm text-gray-600">{partner.website_url}</p>
                      <p className="text-sm text-gray-500">Order: {partner.order_index}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                      onClick={() => {
                        setSelected(partner);
                        setForm({
                          name: partner.name,
                          logo_src: partner.logo_src,
                          website_url: partner.website_url || '',
                          alt_text: partner.alt_text || partner.name,
                        });
                        setEditModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                      onClick={() => {
                        setSelected(partner);
                        setDeleteModalOpen(true);
                      }}
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
                <h3 className="text-xl font-semibold mb-4">Edit Partner</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo Source *</label>
                    <div className="flex space-x-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setLogoInputType('upload')}
                        className={`px-3 py-1 text-xs rounded ${
                          logoInputType === 'upload'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setLogoInputType('url')}
                        className={`px-3 py-1 text-xs rounded ${
                          logoInputType === 'url'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Paste URL
                      </button>
                    </div>
                    
                    {logoInputType === 'upload' ? (
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center ${
                          isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
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
                        {selectedFile ? (
                          <div className="flex flex-col items-center space-y-2">
                            <img
                              src={selectedFile}
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
                                onClick={clearSelectedFile}
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
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Choose File
                          </button>
                        )}
                      </div>
                    ) : (
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/logo.png"
                        value={form.logo_src}
                        onChange={(e) => setForm({ ...form, logo_src: e.target.value })}
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website URL *</label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={form.website_url}
                      onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text *</label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={form.alt_text}
                      onChange={(e) => setForm({ ...form, alt_text: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => {
                      setEditModalOpen(false);
                      setSelected(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isEditing}
                    onClick={async () => {
                      if (!selected || !form) return;
                      
                      // Validation
                      if (!form.name.trim()) {
                        alert('Name is required');
                        return;
                      }
                      if (!form.logo_src.trim()) {
                        alert('Logo is required');
                        return;
                      }
                      if (!form.website_url.trim()) {
                        alert('Website URL is required');
                        return;
                      }
                      if (!form.alt_text.trim()) {
                        alert('Alt text is required');
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
                        // Find the index of the selected partner
                        const selectedIndex = partners.findIndex(p => p.name === selected.name);
                        if (selectedIndex === -1) return;
                        
                        // Update the partner in the array
                        const updatedPartners = [...partners];
                        updatedPartners[selectedIndex] = {
                          ...updatedPartners[selectedIndex],
                          ...form,
                          order_index: updatedPartners[selectedIndex].order_index
                        };
                        
                        // Send entire array to API
                        const res = await authFetch(API_URLS.PARTNERS, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ partners: updatedPartners })
                        });
                        
                        if (res.ok) {
                          setPartners(updatedPartners);
                          setEditModalOpen(false);
                          setSelected(null);
                        } else {
                          console.error('Failed to update partner');
                        }
                      } catch (error) {
                        console.error('Error updating partner:', error);
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
                <h3 className="text-xl font-semibold mb-3">Delete Partner</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to delete "{selected.name}"?</p>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                    onClick={() => {
                      setDeleteModalOpen(false);
                      setSelected(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isDeleting}
                    onClick={async () => {
                      if (!selected) return;
                      
                      setIsDeleting(true);
                      try {
                        // Remove the selected partner from array
                        const filtered = partners.filter((p) => p.name !== selected.name);
                        
                        // Update order_index for remaining partners
                        const updatedPartners = filtered.map((p, idx) => ({
                          ...p,
                          order_index: idx + 1
                        }));
                        
                        // Send updated array to API
                        const res = await authFetch(API_URLS.PARTNERS, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ partners: updatedPartners })
                        });
                        
                        if (res.ok) {
                          setPartners(updatedPartners);
                          setDeleteModalOpen(false);
                          setSelected(null);
                        } else {
                          console.error('Failed to delete partner');
                        }
                      } catch (error) {
                        console.error('Error deleting partner:', error);
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
                <h3 className="text-xl font-semibold mb-4">Add Partner</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={addForm.name} onChange={(e) => setAddForm({ ...addForm, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo Source *</label>
                    <div className="flex space-x-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setLogoInputType('upload')}
                        className={`px-3 py-1 text-xs rounded ${
                          logoInputType === 'upload'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Upload Image
                      </button>
                      <button
                        type="button"
                        onClick={() => setLogoInputType('url')}
                        className={`px-3 py-1 text-xs rounded ${
                          logoInputType === 'url'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        Paste URL
                      </button>
                    </div>
                    
                    {logoInputType === 'upload' ? (
                      <div
                        className={`border-2 border-dashed rounded-lg p-4 text-center ${
                          isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
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
                        {selectedFile ? (
                          <div className="flex flex-col items-center space-y-2">
                            <img
                              src={selectedFile}
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
                                onClick={clearSelectedFile}
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
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Choose File
                          </button>
                        )}
                      </div>
                    ) : (
                      <input
                        type="url"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/logo.png"
                        value={addForm.logo_src}
                        onChange={(e) => setAddForm({ ...addForm, logo_src: e.target.value })}
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website URL *</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={addForm.website_url} onChange={(e) => setAddForm({ ...addForm, website_url: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text *</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" value={addForm.alt_text} onChange={(e) => setAddForm({ ...addForm, alt_text: e.target.value })} />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300" onClick={() => setAddModalOpen(false)}>Cancel</button>
                  <button
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isAdding}
                    onClick={async () => {
                      if (!addForm) return;
                      
                      // Validation
                      if (!addForm.name.trim()) {
                        alert('Name is required');
                        return;
                      }
                      if (!addForm.logo_src.trim()) {
                        alert('Logo is required');
                        return;
                      }
                      if (!addForm.website_url.trim()) {
                        alert('Website URL is required');
                        return;
                      }
                      if (!addForm.alt_text.trim()) {
                        alert('Alt text is required');
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
                        // Create new partner object
                        const newPartner = {
                          name: addForm.name,
                          logo_src: addForm.logo_src,
                          website_url: addForm.website_url,
                          alt_text: addForm.alt_text,
                          order_index: partners.length + 1
                        };
                        
                        // Add to local array immediately
                        const updatedPartners = [...partners, newPartner];
                        setPartners(updatedPartners);
                        
                        // Update backend with entire array
                        const res = await authFetch(API_URLS.PARTNERS, {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ partners: updatedPartners })
                        });
                        
                        if (res.ok) {
                          setAddModalOpen(false);
                          setAddForm(null);
                        } else {
                          console.error('Failed to create partner');
                          // Revert local changes if API fails
                          setPartners(partners);
                        }
                      } catch (error) {
                        console.error('Error creating partner:', error);
                        // Revert local changes if API fails
                        setPartners(partners);
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