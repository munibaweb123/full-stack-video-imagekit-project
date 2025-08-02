// app/videos/page.tsx

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import VideoFeed from "../components/VideoFeeds";
import { IVideo } from "../../../models/Video";

export default function VideosPage() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("/api/videos");
        setVideos(res.data);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">All Videos</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <VideoFeed videos={videos} />
      )}
    </main>
  );
}
