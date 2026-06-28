// CS Construction Portal - Media Library Management Page
'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/supabase';
import { MediaFile } from '@/lib/mockDb';
import GlassCard from '@/components/GlassCard';
import {
  Image as ImageIcon,
  FolderOpen,
  FolderPlus,
  Upload,
  Search,
  Trash2,
  Lock,
  X,
  FileText,
  FileMinus,
  CheckSquare,
  Square,
  FileArchive,
  Download,
  Info
} from 'lucide-react';

export default function MediaPage() {
  const { user, role, canManageTeam } = useAuth(); // Editor clearance same as team
  
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFolder, setCurrentFolder] = useState('/');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Folder list
  const [folders, setFolders] = useState<string[]>(['/', '/Photos', '/Drawings', '/Surveys', '/Projects']);
  const [newFolderName, setNewFolderName] = useState('');
  const [showFolderModal, setShowFolderModal] = useState(false);

  // Selection & Details
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Mock upload simulator state
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const list = await db.media.list();
      setFiles(list);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim() || !canManageTeam) return;
    
    let path = newFolderName.trim();
    if (!path.startsWith('/')) path = '/' + path;
    
    if (!folders.includes(path)) {
      const updated = [...folders, path];
      setFolders(updated);
      db.logs.log(user?.email || 'admin', `Created media directory folder "${path}"`, 'Media');
    }
    
    setNewFolderName('');
    setShowFolderModal(false);
  };

  const handleSimulatedUpload = () => {
    if (!canManageTeam) return;
    setUploading(true);
    
    // Simulate a file upload from local machine
    setTimeout(async () => {
      const mockNames = ['structural_foundation_layout_v2.pdf', 'camps_bay_site_before.jpg', 'wood_finishing_specification.docx', 'client_deposit_receipt.pdf'];
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      
      const fileExt = randomName.split('.').pop() || '';
      let mimeType = 'application/octet-stream';
      if (fileExt === 'pdf') mimeType = 'application/pdf';
      else if (fileExt === 'jpg') mimeType = 'image/jpeg';
      else if (fileExt === 'docx') mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

      const mockSize = Math.floor(Math.random() * 5000000) + 100000; // 100kb to 5mb

      const newFile = {
        filename: randomName,
        url: mimeType.startsWith('image') ? 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400' : '#',
        size_bytes: mockSize,
        mime_type: mimeType,
        folder_path: currentFolder
      };

      await db.media.upload(newFile, user?.email || 'admin');
      
      setUploading(false);
      loadMedia();
      alert(`File "${randomName}" successfully uploaded to directory "${currentFolder}"`);
    }, 1500);
  };

  const handleDeleteFile = async (id: string) => {
    if (!canManageTeam) return;
    if (confirm('Are you sure you want to permanently delete this file?')) {
      try {
        await db.media.delete(id, user?.email || 'admin');
        if (selectedFile?.id === id) setSelectedFile(null);
        setSelectedIds(prev => prev.filter(item => item !== id));
        loadMedia();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (!canManageTeam || selectedIds.length === 0) return;
    if (confirm(`Are you sure you want to delete the ${selectedIds.length} selected files?`)) {
      try {
        for (const id of selectedIds) {
          await db.media.delete(id, user?.email || 'admin');
        }
        setSelectedIds([]);
        setSelectedFile(null);
        loadMedia();
        alert('Bulk file deletion completed.');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIds.includes(id)) {
      setSelectedIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const handleToggleSelectAll = () => {
    const folderFilesIds = folderFiles.map(f => f.id);
    const allSelected = folderFilesIds.every(id => selectedIds.includes(id));
    
    if (allSelected) {
      // Unselect all in this folder
      setSelectedIds(prev => prev.filter(id => !folderFilesIds.includes(id)));
    } else {
      // Select all in this folder
      setSelectedIds(prev => {
        const added = folderFilesIds.filter(id => !prev.includes(id));
        return [...prev, ...added];
      });
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return ImageIcon;
    if (mimeType === 'application/pdf') return FileText;
    return FileArchive;
  };

  const formatSize = (bytes: number) => {
    if (bytes >= 1000000) return (bytes / 1000000).toFixed(1) + ' MB';
    return (bytes / 1000).toFixed(0) + ' KB';
  };

  // Filter logic
  const folderFiles = files.filter(f => {
    const matchesFolder = f.folder_path === currentFolder;
    const matchesSearch = f.filename.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const folderFilesIds = folderFiles.map(f => f.id);
  const isAllSelected = folderFilesIds.length > 0 && folderFilesIds.every(id => selectedIds.includes(id));

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <span className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Access Gate Lock Notice */}
      {!canManageTeam && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl text-primary text-xs font-semibold flex items-center gap-2 select-none animate-pulse-slow">
          <Lock size={14} />
          <span>Viewer Access Only: You do not have permissions to upload assets, delete files, or add directories.</span>
        </div>
      )}

      {/* Title & Actions Bar */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 bg-card border border-border p-4 rounded-xl shadow-md">
        
        {/* Title */}
        <div className="flex items-center gap-2.5">
          <FolderOpen className="text-primary" size={20} />
          <div>
            <h3 className="font-bold text-sm text-foreground">Centralized Media Library</h3>
            <p className="text-[10px] text-muted-foreground">Current folder path: <span className="text-primary font-bold">{currentFolder}</span></p>
          </div>
        </div>

        {/* Search & Bulk actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="flex items-center gap-2 bg-background border border-border px-3 py-1.5 rounded-lg text-muted-foreground focus-within:border-primary transition text-xs select-none">
            <Search size={14} />
            <input
              type="text"
              placeholder="Search file names..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-foreground placeholder-muted w-40 sm:w-48"
            />
          </div>

          {/* Bulk delete */}
          {selectedIds.length > 0 && canManageTeam && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-950/40 text-red-400 hover:bg-red-900/40 border border-red-900/40 py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer animate-fade-in"
            >
              <Trash2 size={13} />
              <span>Delete ({selectedIds.length})</span>
            </button>
          )}

          {/* New folder */}
          {canManageTeam && (
            <button
              onClick={() => setShowFolderModal(true)}
              className="bg-card hover:bg-slate-100 dark:hover:bg-slate-900 border border-border text-foreground font-bold py-1.5 px-3 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer"
            >
              <FolderPlus size={13} />
              <span>New Folder</span>
            </button>
          )}

          {/* Upload file */}
          {canManageTeam && (
            <button
              onClick={handleSimulatedUpload}
              disabled={uploading}
              className="bg-primary hover:bg-primary-hover text-white font-bold py-1.5 px-3.5 rounded-lg flex items-center gap-1.5 text-xs shadow-md shadow-primary/10 transition cursor-pointer"
            >
              {uploading ? <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : <Upload size={13} />}
              <span>Upload Asset</span>
            </button>
          )}
        </div>

      </div>

      {/* Grid view layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Left Side: Folder tree */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-xs font-extrabold text-slate-400 dark:text-slate-500 tracking-wider uppercase pl-1 select-none">Folder tree</h3>
          <div className="grid grid-cols-1 gap-1">
            {folders.map(f => {
              const isSelected = currentFolder === f;
              const count = files.filter(item => item.folder_path === f).length;
              return (
                <button
                  key={f}
                  onClick={() => { setCurrentFolder(f); setSelectedFile(null); }}
                  className={`text-left p-3 rounded-xl border transition flex items-center justify-between group cursor-pointer
                    ${isSelected
                      ? 'bg-primary text-white border-primary font-bold shadow-md shadow-primary/10'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-880 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }
                  `}
                >
                  <div className="flex items-center gap-2 select-none">
                    <FolderOpen size={15} />
                    <span className="text-xs font-semibold">{f === '/' ? 'Root ( / )' : f.substring(1)}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded
                    ${isSelected ? 'bg-primary-dark text-white' : 'bg-slate-100 dark:bg-slate-950 text-slate-500'}
                  `}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Files Grid (col-span-2) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1 select-none text-xs text-slate-500">
            <button
              onClick={handleToggleSelectAll}
              className="flex items-center gap-1.5 font-bold hover:text-slate-700 dark:hover:text-slate-300 transition cursor-pointer"
            >
              {isAllSelected ? <CheckSquare size={14} className="text-primary" /> : <Square size={14} />}
              <span>Select All files</span>
            </button>
            <span>Showing {folderFiles.length} files</span>
          </div>

          {folderFiles.length === 0 ? (
            <div className="p-16 text-center text-slate-500 border border-dashed border-slate-200 dark:border-slate-900 rounded-xl text-sm">
              Folder is empty. Upload project images or documents.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {folderFiles.map((file) => {
                const Icon = getFileIcon(file.mime_type);
                const isImg = file.mime_type.startsWith('image/');
                const isSelected = selectedIds.includes(file.id);
                const isDetailSelected = selectedFile?.id === file.id;

                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`glass-panel rounded-xl border p-3.5 transition duration-200 relative group flex flex-col justify-between h-44 cursor-pointer select-none
                      ${isDetailSelected ? 'border-primary shadow-lg' : 'border-slate-200 dark:border-slate-850 hover:border-primary/20'}
                    `}
                  >
                    {/* Checkbox Select Overlay */}
                    {canManageTeam && (
                      <button
                        onClick={(e) => handleToggleSelect(file.id, e)}
                        className={`absolute top-2 left-2 p-1 z-20 rounded-md transition duration-200
                          ${isSelected ? 'text-primary opacity-100' : 'text-slate-400 opacity-0 group-hover:opacity-100 hover:text-white'}
                        `}
                      >
                        {isSelected ? <CheckSquare size={15} /> : <Square size={15} />}
                      </button>
                    )}

                    {/* Thumbnail / file Type block */}
                    <div className="h-24 w-full rounded-lg bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden border border-slate-200/50 dark:border-slate-900 select-none relative">
                      {isImg && file.url !== '#' ? (
                        <img src={file.url} alt={file.filename} className="w-full h-full object-cover" />
                      ) : (
                        <Icon size={32} className={file.mime_type === 'application/pdf' ? 'text-red-500' : 'text-slate-500'} />
                      )}
                    </div>

                    {/* Details footer */}
                    <div className="mt-2.5">
                      <p className="font-bold text-[10px] text-slate-700 dark:text-slate-300 truncate" title={file.filename}>
                        {file.filename}
                      </p>
                      <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">{formatSize(file.size_bytes)}</p>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Side: File detail preview (col-span-1) */}
        <div className="lg:col-span-1">
          {selectedFile ? (
            <GlassCard className="space-y-4 animate-slide-in">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-900 pb-3">
                <div className="flex items-center gap-1.5 select-none">
                  <Info size={14} className="text-primary" />
                  <h4 className="font-bold text-xs text-slate-800 dark:text-white">File Details</h4>
                </div>
                <button
                  onClick={() => setSelectedFile(null)}
                  className="p-1 hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-400 hover:text-white rounded-lg transition"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Preview Box */}
              <div className="w-full aspect-video rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-900 overflow-hidden flex items-center justify-center select-none">
                {selectedFile.mime_type.startsWith('image/') && selectedFile.url !== '#' ? (
                  <img src={selectedFile.url} alt={selectedFile.filename} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    {React.createElement(getFileIcon(selectedFile.mime_type), { size: 28, className: selectedFile.mime_type === 'application/pdf' ? 'text-red-500' : 'text-slate-500' })}
                    <span className="text-[9px] font-extrabold uppercase text-slate-500">{selectedFile.filename.split('.').pop()} document</span>
                  </div>
                )}
              </div>

              {/* Data list */}
              <div className="space-y-2 text-[10px] text-slate-500 leading-relaxed">
                <p className="flex justify-between truncate"><span className="text-slate-400">File Name:</span> <span className="font-bold text-slate-700 dark:text-slate-350">{selectedFile.filename}</span></p>
                <p className="flex justify-between"><span className="text-slate-400">Directory:</span> <span className="font-semibold text-primary">{selectedFile.folder_path}</span></p>
                <p className="flex justify-between"><span className="text-slate-400">File Size:</span> <span className="font-medium">{formatSize(selectedFile.size_bytes)}</span></p>
                <p className="flex justify-between"><span className="text-slate-400">Uploaded:</span> <span className="font-medium">{new Date(selectedFile.uploaded_at).toLocaleDateString()}</span></p>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-900 flex gap-2">
                <a
                  href={selectedFile.url !== '#' ? selectedFile.url : undefined}
                  download={selectedFile.filename}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 text-[10px] font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 transition cursor-pointer select-none"
                  onClick={(e) => { if (selectedFile.url === '#') e.preventDefault(); }}
                >
                  <Download size={12} className="text-primary" />
                  <span>Download</span>
                </a>
                
                {canManageTeam && (
                  <button
                    onClick={() => handleDeleteFile(selectedFile.id)}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-850 hover:border-red-950/20 text-slate-450 hover:text-red-500 text-[10px] font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Trash2 size={12} />
                    <span>Delete File</span>
                  </button>
                )}
              </div>

            </GlassCard>
          ) : (
            <div className="hidden lg:flex flex-col items-center justify-center p-12 text-slate-500 border border-dashed border-slate-200 dark:border-slate-900 rounded-xl text-center min-h-[200px] select-none bg-slate-900/10">
              <Info size={24} className="text-slate-600 mb-2 opacity-50" />
              <p className="text-[10px]">Select any file grid item to review download links, uploader dates, and file details.</p>
            </div>
          )}
        </div>

      </div>

      {/* New Folder Modal Dialog */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFolderModal(false)}></div>
          
          <div className="relative glass-panel bg-card rounded-2xl max-w-sm w-full border border-border overflow-hidden shadow-2xl animate-scale-up">
            <div className="p-4 border-b border-border flex justify-between items-center bg-slate-50 dark:bg-slate-900/60 select-none">
              <h4 className="font-bold text-xs text-foreground">Create Media Directory</h4>
              <button onClick={() => setShowFolderModal(false)} className="text-muted-foreground hover:text-foreground">
                <X size={14} />
              </button>
            </div>
            
            <form onSubmit={handleCreateFolder} className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-muted-foreground uppercase">Folder Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Estimates"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-border rounded-lg py-2 px-3 text-xs outline-none focus:border-primary"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFolderModal(false)}
                  className="bg-card hover:bg-slate-100 dark:hover:bg-slate-900 border border-border text-foreground font-bold py-1.5 px-3 rounded-lg text-[10px] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover text-white font-bold py-1.5 px-3.5 rounded-lg text-[10px] shadow transition cursor-pointer"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
