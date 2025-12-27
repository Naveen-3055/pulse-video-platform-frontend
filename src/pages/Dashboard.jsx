import React, { useEffect, useState, useContext } from "react";
import socket from "../socket/socket";
import axios from "axios";
import { API_URL } from "../config/env";
import { userDataContext } from "../context/Usercontext";
import UploadVideo from "./Upload";

axios.defaults.withCredentials = true;

function Dashboard() {
  // consume data from userdatacontext.
  const { user,setUser } = useContext(userDataContext);
 
  const [videos, setVideos] = useState([]);

  // step 1: fetch videos
  const loadVideos = async () => {
    try {
      // calling APi
      const response = await axios.get(`${API_URL}/api/videos/getallvideos`);
      setVideos(response.data.videos || []);
    } catch (error) {
      console.log("Failed to load videos:", error.message);
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  // step 2: socket events for dynamic updation
  useEffect(() => {
    // progress of the video
    socket.on("videoProgress", ({ videoId, progress }) => {
      setVideos((prev) =>
        prev.map((video) =>
          video._id === videoId ? { ...video, progress } : video
        )
      );
    });

    // status of the video
    socket.on("videoStatus", ({ videoId, status }) => {
      setVideos((prev) =>
        prev.map((video) =>
          video._id === videoId ? { ...video, status } : video
        )
      );
    });

    // added the video into DB
    socket.on("videoAdded", (newVideo) => {
      setVideos((prev) => [newVideo, ...prev]);
    });

    // clean up functions
    return () => {
      socket.off("videoProgress");
      socket.off("videoStatus");
      socket.off("videoAdded");
    };
  }, []);

  const role = user.role

  // Viewer sees ONLY safe videos
  const visibleVideos =
    role === "viewer"
      ? videos.filter((v) => v.status === "safe")
      : videos;

  // step 3: status badge of the video
  const getStatusBadge = (status) => {
    if (status === "processing")
      return <span className="text-yellow-500 font-semibold">Processing</span>;
    if (status === "safe")
      return <span className="text-green-600 font-semibold">Safe</span>;
    if (status === "flagged")
      return <span className="text-red-600 font-semibold">Flagged</span>;
    return null;
  };

  const handleLogout = ()=>{
    setUser(null)
  }

  // video dashboard UI
  return (
    <div className="max-w-7xl mx-auto p-8">
      
      {/* logout button */}
      <div className="w-[20%]">
        <button onClick={()=>handleLogout()}>logout</button>
      </div>

      <h2 className="text-3xl font-bold text-center mb-10">
        Video Dashboard 
      </h2>

      {visibleVideos.length === 0 && (
        <p className="text-center text-gray-500">No videos found</p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {visibleVideos.map((video) => (
          <div
            key={video._id}
            className="bg-white border rounded-xl p-5 shadow"
          >
            <h4 className="text-lg font-semibold mb-3">
              {video.title}
            </h4>

            {/* Progress BAR */}
            <div className="w-full h-3 bg-gray-200 rounded-full mb-3">
              <div
                className={`h-full rounded-full ${
                  video.status === "safe"
                    ? "bg-green-500"
                    : video.status === "flagged"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
                style={{ width: `${video.progress || 0}%` }}
              />
            </div>

            <p className="mb-2">Status: {getStatusBadge(video.status)}</p>

            {/* Video Player for the videos */}
            {video.status === "safe" && (
              <video
                controls
                className="w-full rounded-lg mt-3"
                src={`${API_URL}/api/videos/stream/${video._id}`}
              />
            )}

            {video.status === "flagged" && (
              <p className="text-sm text-red-600 mt-3">
                 Flagged videos cannot be viewed
              </p>
            )}

            
          </div>
        ))}
      </div>

      {/* Upload the video */}
      {(role === "editor" || role === "admin") && (
        <div className="mt-12">
          <UploadVideo />
        </div>
      )}
    
    </div>
  );
}

export default Dashboard;
