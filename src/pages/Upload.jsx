import React, { useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "../config/env";

axios.defaults.withCredentials = true;

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const fileRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      setError("Please provide a title and select a video file.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);

    setUploading(true);
    setError("");

    try {
      await axios.post(`${API_URL}/api/videos/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFile(null);
      setTitle("");
      fileRef.current.value = "";
      alert("Video uploaded successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800">
         Upload New Video
      </h3>

      <form onSubmit={handleUpload} className="space-y-5">
        {/* Video Title */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Video Title
          </label>
          <input
            type="text"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={uploading}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Video File
          </label>

          <div
            onClick={() => fileRef.current.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition"
          >
            <p className="text-gray-600">
              {file ? (
                <>
                  🎬 <span className="font-medium">{file.name}</span>
                </>
              ) : (
                "Click to select a video file"
              )}
            </p>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={uploading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition 
            ${uploading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
          `}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>

        {/* Error Message */}
        {error && (
          <p className="text-center text-red-500 font-medium">{error}</p>
        )}
      </form>
    </div>
  );
};

export default UploadVideo;
