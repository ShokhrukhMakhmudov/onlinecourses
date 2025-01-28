import VideoPlayer from "@/components/VideoPlayer";
import React from "react";

export default function page() {
  return (
    <div>
      <VideoPlayer
        videoUrl={"videos/hls/678cefb1f2990023ff4e10f1/playlist.m3u8"}
        id={"678cefb1f2990023ff4e10f1"}
      />
    </div>
  );
}
