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

  return (
    <div className="w-full flex flex-col gap-3">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="w-full bg-tonal-a20 rounded-full pl-5 pr-2 py-1.5 flex items-center justify-between gap-3 transition-all duration-200">
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
            placeholder="Ask AI to generate a problem or upload an image..."
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
          <div className="relative bg-tonal-a10 pl-3 pr-8 py-1 rounded-full flex items-center gap-2 border border-secondary-a70/20 text-xs text-neutral-a300">
            <span className="text-secondary-a70 font-bold">✓</span>
            <span className="truncate font-mono">{selectedImage?.name}</span>
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-a400 hover:text-danger-a10 text-sm font-bold cursor-pointer transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GenerateProblem;
