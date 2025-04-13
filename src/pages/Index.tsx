
import React, { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import ImageProcessor from '@/components/ImageProcessor';

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
  };

  const resetImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-0">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Gray It Down</h1>
          <p className="text-muted-foreground">
            Upload an image, convert it to grayscale, and download it in seconds
          </p>
        </header>

        <main className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {!selectedImage ? (
            <ImageUploader onImageSelect={handleImageSelect} />
          ) : (
            <ImageProcessor imageFile={selectedImage} onReset={resetImage} />
          )}
        </main>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Simple, fast, and free image conversion. No account required.</p>
          <p className="mt-1">Your images are processed entirely in your browser and never uploaded to any server.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
