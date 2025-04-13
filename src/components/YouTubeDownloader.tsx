
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, Youtube, Loader2, FileVideo, Headphones, Download } from "lucide-react";

type VideoQuality = "360p" | "480p" | "720p" | "1080p";
type DownloadFormat = "mp4" | "mp3";

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  author: string;
}

const YouTubeDownloader = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality>("720p");
  const [downloadFormat, setDownloadFormat] = useState<DownloadFormat>("mp4");

  const handleFetchVideo = (e: React.FormEvent) => {
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
    setVideoData(null);
    
    // Simulate fetching video info
    setTimeout(() => {
      // Extract video ID (this is a simple extraction, real implementation would be more robust)
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1]?.split('&')[0] || '';
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      }
      
      if (videoId) {
        // In a real implementation, you would call your backend API to get video info
        setVideoData({
          id: videoId,
          title: "Sample YouTube Video Title",
          thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          duration: "10:30",
          author: "YouTube Creator"
        });
        toast.success("Video found! Select quality and format to download.");
      } else {
        toast.error("Could not extract video information. Please check the URL.");
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleDownload = () => {
    if (!videoData) return;
    
    setIsLoading(true);
    
    // Simulate download process
    setTimeout(() => {
      setIsLoading(false);
      
      // Create a dummy download to demonstrate functionality
      const fileName = `${videoData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${selectedQuality}.${downloadFormat}`;
      
      // Create a temporary link to simulate download
      const a = document.createElement('a');
      a.href = downloadFormat === 'mp4' ? videoData.thumbnail : '#';
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success(`${downloadFormat === 'mp4' ? 'Video' : 'Audio'} download started!`, {
        description: `Downloading "${videoData.title}" in ${downloadFormat === 'mp4' ? selectedQuality : 'high quality MP3'}`
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-100 shadow-sm">
        <div className="flex items-center gap-2 text-red-600 font-medium mb-2">
          <Youtube size={20} />
          <h3>YouTube Video Downloader</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter a YouTube video URL to download it directly to your device.
        </p>
      </div>

      <form onSubmit={handleFetchVideo} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Paste YouTube video URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isLoading} 
            className="gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Find Video
              </>
            )}
          </Button>
        </div>
      </form>

      {videoData && (
        <div className="rounded-lg border bg-white/90 shadow-sm overflow-hidden">
          <div className="aspect-video bg-gray-100">
            <img 
              src={videoData.thumbnail} 
              alt={videoData.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 space-y-4">
            <div>
              <h3 className="font-medium text-lg truncate">{videoData.title}</h3>
              <p className="text-sm text-muted-foreground">{videoData.author} • {videoData.duration}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={downloadFormat === 'mp4' ? 'default' : 'outline'}
                    className={`flex-1 ${downloadFormat === 'mp4' ? 'bg-red-500 hover:bg-red-600' : ''}`}
                    onClick={() => setDownloadFormat('mp4')}
                  >
                    <FileVideo className="mr-2 h-4 w-4" />
                    MP4 Video
                  </Button>
                  <Button
                    type="button"
                    variant={downloadFormat === 'mp3' ? 'default' : 'outline'}
                    className={`flex-1 ${downloadFormat === 'mp3' ? 'bg-red-500 hover:bg-red-600' : ''}`}
                    onClick={() => setDownloadFormat('mp3')}
                  >
                    <Headphones className="mr-2 h-4 w-4" />
                    MP3 Audio
                  </Button>
                </div>
              </div>
              
              {downloadFormat === 'mp4' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quality</label>
                  <Select 
                    value={selectedQuality} 
                    onValueChange={(value: string) => setSelectedQuality(value as VideoQuality)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="360p">360p</SelectItem>
                      <SelectItem value="480p">480p</SelectItem>
                      <SelectItem value="720p">720p (HD)</SelectItem>
                      <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleDownload}
              disabled={isLoading}
              className="w-full gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Download {downloadFormat === 'mp4' ? `${selectedQuality} Video` : 'MP3 Audio'}
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-lg border backdrop-blur-sm bg-white/80 p-4 shadow-sm">
        <h4 className="font-medium mb-2">How to download YouTube videos:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
          <li>Copy the video URL from YouTube</li>
          <li>Paste the URL in the input field above</li>
          <li>Click the "Find Video" button</li>
          <li>Select your preferred format and quality</li>
          <li>Click "Download" and save the file</li>
        </ol>
        <p className="mt-3 text-xs text-muted-foreground">
          Note: Please respect copyright restrictions and only download videos you have permission to access.
        </p>
      </div>
    </div>
  );
};

export default YouTubeDownloader;
