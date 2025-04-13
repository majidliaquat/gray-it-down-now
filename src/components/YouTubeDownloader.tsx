
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { ArrowDown, Youtube } from "lucide-react";

const YouTubeDownloader = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error("Please enter a YouTube video URL");
      return;
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    if (!youtubeRegex.test(url)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    setIsLoading(true);
    
    // Simulate download process
    setTimeout(() => {
      toast.success("Download started! Check your downloads folder.");
      setIsLoading(false);
      // In a real app, you would implement actual YouTube download functionality here
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 rounded-lg p-4 border border-red-100">
        <div className="flex items-center gap-2 text-red-600 font-medium mb-2">
          <Youtube size={20} />
          <h3>YouTube Video Downloader</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter a YouTube video URL to download it directly to your device.
        </p>
      </div>

      <form onSubmit={handleDownload} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Paste YouTube video URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading} className="gap-2">
            {isLoading ? "Processing..." : "Download"}
            {!isLoading && <ArrowDown size={16} />}
          </Button>
        </div>
      </form>

      <div className="rounded-lg border bg-card p-4">
        <h4 className="font-medium mb-2">How to download YouTube videos:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
          <li>Copy the video URL from YouTube</li>
          <li>Paste the URL in the input field above</li>
          <li>Click the Download button</li>
          <li>Wait for the download to complete</li>
        </ol>
        <p className="mt-3 text-xs text-muted-foreground">
          Note: Please respect copyright restrictions and only download videos you have permission to access.
        </p>
      </div>
    </div>
  );
};

export default YouTubeDownloader;
