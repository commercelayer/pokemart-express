/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div
        style={{
          backgroundImage: `url("/images/card-background.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="w-full rounded-lg mb-4 cursor-pointer border border-gray-900"
      >
        <img
          className="w-full object-cover"
          src={selectedImage}
          alt="Selected Image"
          onClick={() => handleImageClick(selectedImage)}
        />
      </div>
      <div className="flex flex-wrap">
        {images.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index + 1}`}
            className={`object-cover rounded-lg bg-gray-600 cursor-pointer border-2 ${selectedImage === imageUrl ? "border-yellow-400" : "border-gray-800"}`}
            onClick={() => handleImageClick(imageUrl)}
            style={{
              flex: "1 0 21%",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
