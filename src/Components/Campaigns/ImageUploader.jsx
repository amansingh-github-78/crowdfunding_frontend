import { useState } from "react";

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    
    setImages((prevImages) => [...prevImages, ...newImages]); // Append instead of replacing
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <label className="block mb-1 text-white">Upload Images</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="w-full mt-2 text-white"
      />

      {/* Preview Section */}
      <div className="flex flex-wrap gap-2 mt-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={image}
              alt={`uploaded-${index}`}
              className="w-full h-full object-cover rounded-lg border border-gray-500"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
