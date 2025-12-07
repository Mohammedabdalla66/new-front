import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';
import { toast } from 'react-toastify';

const FileUploadArea = ({ 
  onFilesSelected, 
  maxFiles = 5, 
  maxSize = 5 * 1024 * 1024, 
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg'] 
}) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(file => {
        file.errors.forEach(error => {
          if (error.code === 'file-too-large') {
            toast.error(`File ${file.file.name} is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
          } else if (error.code === 'file-invalid-type') {
            toast.error(`File ${file.file.name} has invalid type. Allowed types: ${acceptedTypes.join(', ')}`);
          } else if (error.code === 'too-many-files') {
            toast.error(`Too many files. Maximum allowed: ${maxFiles}`);
          }
        });
      });
    }

    // Handle accepted files
    if (acceptedFiles.length > 0) {
      const newFiles = [...files, ...acceptedFiles];
      
      if (newFiles.length > maxFiles) {
        toast.error(`Maximum ${maxFiles} files allowed`);
        return;
      }

      setFiles(newFiles);
      onFilesSelected(newFiles);
    }
  }, [files, maxFiles, maxSize, acceptedTypes, onFilesSelected]);

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/jpg': ['.jpg']
    },
    maxSize,
    maxFiles,
    multiple: true
  });

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`upload-area ${isDragActive ? 'active' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Upload className="w-6 h-6 text-green-600" />
          </div>
          {isDragActive ? (
            <div className="text-center">
              <p className="text-lg font-medium text-green-600">
                Drop files here
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg font-medium text-gray-700 mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-gray-500">
                License/Official Documents ({acceptedTypes.join(', ').toUpperCase()})
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Max {maxFiles} files, {maxSize / (1024 * 1024)}MB each
              </p>
            </div>
          )}
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {files.length === 0 && (
        <div className="flex items-center space-x-2 text-amber-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>At least one document is required</span>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;