
import React, { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface ImageProcessorProps {
  imageFile: File | null;
  onReset: () => void;
}

const ImageProcessor: React.FC<ImageProcessorProps> = ({ imageFile, onReset }) => {
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [grayscaleImageUrl, setGrayscaleImageUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (imageFile) {
      setIsProcessing(true);
      // Create URL for original image
      const url = URL.createObjectURL(imageFile);
      setOriginalImageUrl(url);

      // Load the image to convert it to grayscale
      const img = new Image();
      img.onload = () => {
        convertToGrayscale(img);
      };
      img.src = url;

      // Cleanup function
      return () => {
        URL.revokeObjectURL(url);
        if (grayscaleImageUrl) {
          URL.revokeObjectURL(grayscaleImageUrl);
        }
      };
    }
  }, [imageFile]);

  const convertToGrayscale = (image: HTMLImageElement) => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw original image to canvas
    ctx.drawImage(image, 0, 0);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Convert to grayscale
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
      // data[i + 3] is alpha (the fourth value)
    }

    // Put grayscale image data back on canvas
    ctx.putImageData(imageData, 0, 0);

    // Convert canvas to data URL
    const grayscaleUrl = canvas.toDataURL('image/png');
    setGrayscaleImageUrl(grayscaleUrl);
    setIsProcessing(false);
  };

  const downloadGrayscaleImage = () => {
    if (!grayscaleImageUrl) return;

    const link = document.createElement('a');
    link.href = grayscaleImageUrl;
    link.download = `grayscale-${imageFile?.name || 'image'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download started",
      description: "Your grayscale image is downloading"
    });
  };

  if (!imageFile) return null;

  return (
    <div className="w-full fade-in">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex-1">
          <h3 className="font-medium mb-2">Original Image</h3>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
            {originalImageUrl ? (
              <img 
                src={originalImageUrl} 
                alt="Original" 
                className="h-full w-full object-contain"
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium mb-2">Grayscale Image</h3>
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-muted">
            {isProcessing ? (
              <Skeleton className="h-full w-full" />
            ) : grayscaleImageUrl ? (
              <img 
                src={grayscaleImageUrl} 
                alt="Grayscale" 
                className="h-full w-full object-contain"
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onReset}>
          Upload new image
        </Button>
        <Button 
          onClick={downloadGrayscaleImage} 
          disabled={!grayscaleImageUrl || isProcessing}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Grayscale Image
        </Button>
      </div>
    </div>
  );
};

export default ImageProcessor;
