import { forwardRef } from "react";
import { getStrapiMedia } from "@/utils/api-helpers";
const Video = forwardRef((props, ref) => {
  const { videoUrl, autoPlay, isMuted = true, poster } = props;
  return (
    <video
      playsInline
      loop
      muted={isMuted}
      autoPlay={autoPlay}
      src={getStrapiMedia(videoUrl)}
      ref={ref}
      poster={getStrapiMedia(poster)}
      width="100%"
      height="100%"
    ></video>
  );
});

export default Video;
