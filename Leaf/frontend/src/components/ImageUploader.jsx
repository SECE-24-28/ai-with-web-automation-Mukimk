import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2, CheckCircle2 } from 'lucide-react';

const ImageUploader = ({ onUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef(null);

  const validateAndSetFile = (file) => {
    setErrorMsg('');
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Unsupported file type. Please upload a JPEG, PNG, or WEBP image.');
      return;
    }

    // Validate size (10MB limit)
    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > 10.0) {
      setErrorMsg(`File size exceeds 10MB limit (uploaded: ${sizeMb.toFixed(2)}MB).`);
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    inputRef.current.click();
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMsg('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative group flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-3xl transition-all duration-300 ${
          dragActive
            ? 'border-primary bg-primary/5 scale-[1.01]'
            : 'border-slate-300 hover:border-primary/60 bg-white hover:bg-[#FDFDFD]'
        } ${previewUrl ? 'border-primary/40' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={handleChange}
          disabled={isLoading}
        />

        {!previewUrl ? (
          <div className="flex flex-col items-center text-center py-8">
            <div className="bg-primary/5 p-4 rounded-full text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
              <UploadCloud className="h-10 w-10" />
            </div>
            
            <p className="text-slate-700 font-semibold text-lg mb-1">
              Drag & Drop your leaf image
            </p>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              Supports JPG, JPEG, PNG, or WEBP (Max 10MB)
            </p>
            
            <button
              type="button"
              onClick={handleButtonClick}
              disabled={isLoading}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary-dark/10 transition-all duration-200 focus:outline-none"
            >
              Browse Files
            </button>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <div className="relative w-full max-h-[350px] overflow-hidden rounded-2xl shadow-inner bg-slate-50 flex items-center justify-center border border-slate-100 mb-6">
              <img
                src={previewUrl}
                alt="Leaf preview"
                className="object-contain max-h-[350px] rounded-2xl transition-transform duration-500 hover:scale-105"
              />
              <button
                type="button"
                onClick={handleRemove}
                disabled={isLoading}
                className="absolute top-4 right-4 p-2 bg-red-600/90 hover:bg-red-700 text-white rounded-xl shadow-md transition-colors duration-200 focus:outline-none"
                title="Remove image"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 mb-6 bg-green-50 text-primary-dark text-sm font-semibold px-4 py-2 rounded-xl">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>{selectedFile.name}</span>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-4 bg-primary hover:bg-primary-dark disabled:bg-slate-400 text-white text-lg font-extrabold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-primary-dark/10 transition-all duration-200 focus:outline-none"
            >
              {isLoading ? 'Analyzing leaf...' : 'Run CNN Analysis'}
            </button>
          </div>
        )}
      </div>

      {errorMsg && (
        <p className="text-red-600 text-sm font-medium mt-3 text-center animate-pulse">
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
