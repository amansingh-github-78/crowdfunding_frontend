import { useState, useEffect } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";

const VideoHoverBox = ({
  videoSrc,
  thumbnailSrc,
  reverse = false,
  title = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGradient, setShowGradient] = useState(true);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => setShowGradient(false), 500);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setShowGradient(true);
  };

  useEffect(() => {
    const handleTouchOutside = (event) => {
      if (isPlaying && !event.target.closest(".video-container")) {
        handlePause();
      }
    };

    if (isPlaying) {
      document.addEventListener("touchstart", handleTouchOutside);
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchOutside);
    };
  }, [isPlaying]);

  return (
    <div
      className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg cursor-pointer video-container"
      onClick={handlePlay}
      onMouseEnter={handlePlay}
      onMouseLeave={() => window.innerWidth > 640 && handlePause()}
    >
      {!isPlaying && (
        <img
          src={thumbnailSrc}
          alt="thumbnail"
          className="w-full h-full object-cover transition-opacity opacity-100"
        />
      )}

      <LazyMotion features={domAnimation}>
        <motion.div
          className={`absolute top-0 ${reverse ? "right-0" : "left-0"} h-full`}
          initial={{ width: 0 }}
          animate={{ width: isPlaying ? "100%" : "50%" }}
          transition={{ duration: 0.5, ease: "linear" }}
        >
          {isPlaying && (
            <iframe
              width="100%"
              height="100%"
              src={`${videoSrc}?autoplay=1&mute=1`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="rounded-md"
            ></iframe>
          )}

          {showGradient && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: reverse
                  ? "linear-gradient(to left, transparent, #1e3a8a)"
                  : "linear-gradient(to right, transparent, #1e3a8a)",
              }}
              animate={{ opacity: isPlaying ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
                  {/* Title on top*/}
        {!isPlaying && title && !reverse && (
          <div
            className="absolute break-words whitespace-normal top-12 left-8 right-4 z-10 text-white text-xl md:text-4xl lg:text-6xl font-semibold drop-shadow-md"
          >
            {title}
          </div>
        )}
        {!isPlaying && title && reverse && (
          <div className="absolute break-words whitespace-normal top-12 left-8 md:left-24 right-4 z-10 text-white text-xl md:text-4xl lg:text-6xl font-semibold drop-shadow-md"
          >
            {title}
          </div>
        )}
        </motion.div>
      </LazyMotion>
    </div>
  );
};

export default VideoHoverBox;
