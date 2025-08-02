"use client";
import { Video } from '@imagekit/next';

type VideoPlayerProps = {
  src: string;
  width?: number;
  height?: number;
  controls?: boolean;
};

export default function VideoPlayer({
  src,
  width = 500,
  height = 500,
  controls = true,
}: VideoPlayerProps) {
  return (
    <Video
      urlEndpoint={process.env.NEXT_PUBLIC_URL_ENDPOINT!}
      src={src}
      controls={controls}
      width={width}
      height={height}
      style={{ borderRadius: "12px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
    />
  );
}