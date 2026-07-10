import React from "react";

export default function MediaGallery({ images = [], videos = [], className = "" }) {
  const mediaCount = images.length + videos.length;
  if (mediaCount === 0) return null;

  return (
    <div className={`mt-4 overflow-hidden rounded-[24px] border border-slate-100 ${className}`}>
      {mediaCount === 1 ? (
        <div className="max-h-[500px] w-full overflow-hidden">
          {images[0] ? (
            <img src={images[0]} alt="Media content" className="w-full h-full object-cover" />
          ) : (
            <video src={videos[0]} controls className="w-full object-cover" />
          )}
        </div>
      ) : mediaCount === 2 ? (
        <div className="grid grid-cols-2 gap-1.5 h-[300px]">
          {images.map((img, i) => (
            <img key={i} src={img} alt={`Media ${i}`} className="w-full h-full object-cover" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1.5 h-[350px]">
          <div className="col-span-2 h-full">
            <img src={images[0]} alt="Media 0" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-rows-2 gap-1.5 h-full">
            <img src={images[1]} alt="Media 1" className="w-full h-full object-cover" />
            <div className="relative w-full h-full">
              <img src={images[2]} alt="Media 2" className="w-full h-full object-cover" />
              {mediaCount > 3 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white font-bold text-lg">
                  +{mediaCount - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
