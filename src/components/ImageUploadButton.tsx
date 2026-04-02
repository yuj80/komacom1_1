import React, { useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Upload, Loader2 } from 'lucide-react';

interface Props {
    onUploadSuccess: (url: string) => void;
    className?: string;
    buttonClassName?: string;
}

export const ImageUploadButton: React.FC<Props> = ({ onUploadSuccess, className = '', buttonClassName = 'rounded-r-lg' }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const file = event.target.files?.[0];
            if (!file) return;

            setIsUploading(true);

            // Generate a unique filename using timestamp and a random string
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
            const filePath = `${fileName}`;

            // Upload the file to the 'images' bucket
            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            onUploadSuccess(data.publicUrl);
        } catch (error: any) {
            console.error('Error uploading image:', error.message);
            alert(`이미지 업로드에 실패했습니다. Storage 버킷 상태를 확인해주세요: ${error.message}`);
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div className={`inline-block ${className}`}>
            <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                ref={fileInputRef}
                className="hidden"
            />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    fileInputRef.current?.click();
                }}
                disabled={isUploading}
                type="button"
                className={`flex items-center gap-2 bg-zinc-200 hover:bg-zinc-300 text-zinc-700 px-3 py-2.5 text-xs font-bold transition-colors disabled:opacity-50 whitespace-nowrap h-full ${buttonClassName}`}
            >
                {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                {isUploading ? '로딩...' : '업로드'}
            </button>
        </div>
    );
};
