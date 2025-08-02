import { IKVideo } from "imagekitio-react";
import Link from "next/link";
import { IVideo } from "../../../models/Video";

export default function VideoComponent({ video }: { video: IVideo }) {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <div
          className="rounded-xl overflow-hidden relative w-full"
          style={{ aspectRatio: "9/16" }}
        >
          <IKVideo
            path={video.videoUrl}
            transformation={[
              {
                height: video.transformation?.height?.toString() ?? "1920",
                width: video.transformation?.width?.toString() ?? "1080",
                quality: video.transformation?.quality?.toString(),
              },
            ]}
            controls={video.controls}
            className="w-full h-full object-cover"
            title={video.title} // accessibility
          />
        </div>
      </figure>

      <div className="card-body p-4">
        <Link
          href={`/videos/${video._id}`}
          className="hover:opacity-80 transition-opacity block"
        >
          <h2 className="card-title text-lg">{video.title}</h2>
        </Link>

        <p className="text-sm text-base-content/70 line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
