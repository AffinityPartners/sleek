import React from "react";

const VimeoPlayer = () => {
  return (
    <div className="relative w-full h-full">
      <iframe
        title="SLEEK Experience Video"
        src="https://player.vimeo.com/video/756870661?h=b858550a04"
        className="absolute inset-0 w-full h-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VimeoPlayer; 