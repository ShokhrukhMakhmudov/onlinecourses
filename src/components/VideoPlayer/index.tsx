// app/components/VideoPlayer.tsx
"use client";

import { useEffect, useState } from "react";
import videojs from "video.js";

const VideoPlayer = () => {
  const [token, setToken] = useState<string | null>(null);

  // Функция для получения токена от API
  const fetchToken = async () => {
    const res = await fetch("/api/token");
    const data = await res.json();
    setToken(data.token);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      const player = videojs("video-player", {
        controls: true,
        autoplay: false,
        preload: "auto",
      });

      const videoUrl = `/videos/hls/playlist.m3u8`;
      //   const videoUrl = `http://localhost:3000/api/video?filename=video.mp4`;

      // Подключение видео
      player.src({
        src: videoUrl,
        type: "application/x-mpegURL",
      });

      player.ready(() => {
        player.play();
      });

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [token]);

  return (
    <div className="container relative">
      <h1>Video Stream</h1>
      <video
        id="video-player"
        className="video-js vjs-default-skin"
        controls
        // src={`http://localhost:3000/api/video?filename=video.mp4`}
        width="600"
        height="400"></video>
    </div>
  );
};

export default VideoPlayer;
