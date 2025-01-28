// app/components/VideoPlayer.tsx
"use client";

import { useEffect, useState } from "react";
import videojs from "video.js";

const VideoPlayer = ({
  videoUrl,
  id,
  poster,
}: {
  videoUrl?: string;
  id: string;
  poster?: string;
}) => {
  const [token, setToken] = useState<string | null>(null);

  // Функция для получения токена от API

  useEffect(() => {
    const token = sessionStorage.getItem("userToken");
    setToken(token);
  }, []);

  useEffect(() => {
    if (token) {
      const player = videojs(`video-player-${id}`, {
        controls: true,
        autoplay: false,
        theme: "sea",
        preload: "auto",
        fluid: true,
        aspectRatio: "16:9",
        poster: poster,

        sources: [
          {
            src: videoUrl || `/videos/hls/${id}/playlist.m3u8`,
            type: "application/x-mpegURL",
          },
        ],
      });

      // Подключение видео
      player.src({
        src: videoUrl || `/videos/hls/${id}/playlist.m3u8`,
        type: "application/x-mpegURL",
      });
    }
  }, [token, videoUrl, id]);

  return (
    <div className="relative">
      <video
        id={`video-player-${id}`}
        className="video-js vjs-default-skin vjs-big-play-centered vjs-menu-button"
        controls
        src={
          process.env.NEXT_PUBLIC_BASE_URL +
          `/api/video?id=${id}&token=${token}`
        }
        tw="w-full min-h-[480px]"
        width="100%"
        height="480"></video>
    </div>
  );
};

export default VideoPlayer;
