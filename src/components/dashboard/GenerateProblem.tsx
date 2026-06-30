import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';

interface GenerateProblemProps {
  // Callback trả ra text prompt và file ảnh để m dễ dàng gọi API ở trang cha
  onGenerate?: (prompt: string, imageFile: File | null) => void;
  isProcessing?: boolean;
}

export function GenerateProblem({
  onGenerate,
  isProcessing = false,
}: GenerateProblemProps) {
  const [prompt, setPrompt] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dùng ref để kích hoạt thẻ input file ẩn khi click vào icon ảnh
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setSelectedImage(file);
      // Tạo URL xem trước ảnh tạm thời
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCreate = () => {
    // Không gõ prompt cũng không up ảnh thì không làm gì cả
    if (!prompt.trim() && !selectedImage) return;

    if (onGenerate) {
      onGenerate(prompt, selectedImage);
    } else {
      console.log('Dữ liệu gửi đi:', { prompt, selectedImage });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setSelectedImage(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          if (imagePreview) URL.revokeObjectURL(imagePreview);
          setSelectedImage(file);
          setImagePreview(URL.createObjectURL(file));
          break;
        }
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full bg-tonal-a20 rounded-full pl-5 pr-2 py-1.5 flex items-center justify-between gap-3 border-2 transition-all duration-200 ${
          isDragOver
            ? 'border-dashed border-secondary-a70 bg-secondary-a70/10 scale-[1.01] shadow-lg'
            : 'border-transparent'
        }`}
      >
        <div className="flex items-center gap-4 flex-1">
          <button
            type="button"
            onClick={handleImageIconClick}
            className={`transition-colors cursor-pointer p-1 rounded ${selectedImage ? 'text-secondary-a70' : 'text-neutral-a400 hover:text-neutral-a200'}`}
            title="Upload hình ảnh đề bài"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
          </button>

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onPaste={handlePaste}
            placeholder="Ask AI to generate a problem or drag/paste an image here..."
            className="w-full bg-transparent p7 text-white placeholder-neutral-a400 placeholder:p7 focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
          />
        </div>

        <Button
          type="button"
          isProcessing={isProcessing}
          className="w-auto px-6 py-2 rounded-full h7"
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>

      {imagePreview && (
        <div className="w-full flex justify-start pl-2">
          <div className="mt-2 flex items-center gap-4 bg-tonal-a20 border border-neutral-a700/50 rounded-xl p-3 shadow-md max-w-md">
            <div
              onClick={() => setIsModalOpen(true)}
              className="group relative w-16 h-16 rounded-lg overflow-hidden border border-neutral-a700 bg-neutral-a900 shadow-sm transition-all duration-200 hover:scale-105 cursor-pointer flex-shrink-0"
              title="Click to view full image"
            >
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-0.5 overflow-hidden">
              <span className="text-xs font-semibold text-neutral-a100 truncate max-w-[220px]">
                {selectedImage?.name}
              </span>
              <span className="text-[10px] text-neutral-a400">
                {selectedImage ? (selectedImage.size / 1024).toFixed(1) : 0} KB
              </span>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-xs text-danger-a10 hover:text-danger-a0 cursor-pointer font-medium mt-1.5 flex items-center gap-1 transition-colors self-start"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && imagePreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 transition-all duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[85vh] overflow-hidden rounded-lg bg-neutral-a900 p-2 shadow-2xl border border-neutral-a800 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 hover:scale-105 transition-all duration-200 cursor-pointer text-xl font-bold"
            >
              &times;
            </button>
            <img
              src={imagePreview}
              alt="Full Preview"
              className="max-w-full max-h-[80vh] object-contain rounded"
            />
            <div className="p-3 text-center text-sm text-neutral-a300 bg-neutral-a900/90 border-t border-neutral-a800">
              {selectedImage?.name} (
              {selectedImage ? (selectedImage.size / 1024).toFixed(1) : 0} KB)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateProblem;
