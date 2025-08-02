'use client';

import { useState } from 'react';
import axios from 'axios';

export default function VideoUploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [uploadedURL, setUploadedURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setProgress(0);

    try {
      // 🔐 Fetch upload auth parameters from your backend
      const authRes = await fetch('/api/imagekit-auth');
      const { authenticationParameters, publicKey } = await authRes.json();

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('fileName', selectedFile.name);
      formData.append('publicKey', publicKey);
      formData.append('signature', authenticationParameters.signature);
      formData.append('expire', authenticationParameters.expire.toString());
      formData.append('token', authenticationParameters.token);

      const response = await axios.post(
        'https://upload.imagekit.io/api/v1/files/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (event) => {
            if (event.total) {
              const percent = Math.round((event.loaded * 100) / event.total);
              setProgress(percent);
            }
          },
        }
      );

      setUploadedURL(response.data.url);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Upload error:', error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error('Upload error:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <input type="file" accept="video/*" onChange={handleFileChange} />

      {previewURL && (
        <video
          src={previewURL}
          controls
          className="mt-4 w-full rounded-lg border shadow"
        />
      )}

      {uploading && <p>Uploading: {progress}%</p>}

      <button
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {uploadedURL && (
        <div className="mt-4">
          <p className="text-green-600">Uploaded successfully!</p>
          <a
            href={uploadedURL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View on ImageKit
          </a>
        </div>
      )}
    </div>
  );
}
