"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

interface FileUploaderProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export const FileUploader = ({ file, setFile }: FileUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const processSelectedFile = (selectedFile: File) => {
    setFileError(null);

    if (selectedFile.type !== "application/pdf") {
      setFileError("Invalid file type. Please upload a PDF.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File is too large. Maximum size is 5MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const openPreview = () => {
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      window.open(fileUrl, "_blank");
    }
  };

  if (file) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center rounded-2xl border-2 border-green-200 bg-green-50 py-10 px-4 text-center shadow-sm transition-all h-full min-h-50">
        <button
          onClick={clearFile}
          className="absolute right-4 top-4 rounded-full bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:bg-red-50 hover:text-red-500"
          type="button"
          title="Remove file"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-4 relative">
          <div className="rounded-full bg-green-100 p-4 text-green-600 shadow-inner">
            <FileText className="w-8 h-8" />
          </div>
          <CheckCircle2 className="absolute -bottom-1 -right-1 w-5 h-5 text-green-600 bg-white rounded-full" />
        </div>

        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <button
              type="button"
              onClick={openPreview}
              className="flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline truncate max-w-50 cursor-pointer transition-colors"
            >
              {file.name}
              <ExternalLink className="w-3 h-3" />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="bg-slate-900 text-white font-medium"
          >
            <p>{file.name}</p>
          </TooltipContent>
        </Tooltip>
        <p className="text-xs font-medium text-slate-500 mt-1">
          {formatFileSize(file.size)}
        </p>
      </div>
    );
  }

  return (
    <label
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`group relative flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all h-full min-h-55 px-4 py-10 text-center ${
        fileError
          ? "border-red-400 bg-red-50 hover:bg-red-50"
          : "border-slate-300 bg-slate-50 hover:border-blue-500 hover:bg-blue-50/50"
      }`}
    >
      <div
        className={`mb-4 rounded-full p-4 transition-transform group-hover:scale-110 shadow-sm ${
          fileError
            ? "bg-red-100 text-red-600"
            : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
        }`}
      >
        <UploadCloud className="w-8 h-8" />
      </div>

      <p className="mb-1 text-sm font-bold text-slate-700">
        Click to upload or drag and drop
      </p>
      <p className="text-xs font-medium text-slate-500">
        PDF documents only (Max 5MB)
      </p>

      {fileError && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-red-600 bg-red-100/50 px-3 py-1.5 rounded-full animate-in fade-in zoom-in-95 duration-200">
          <AlertCircle className="w-4 h-4" />
          {fileError}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        name="resume"
        accept="application/pdf"
        className="hidden"
        onChange={handleInputChange}
      />
    </label>
  );
};
