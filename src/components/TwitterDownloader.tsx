
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';
import { Download, Loader2 } from 'lucide-react';

const TwitterDownloader = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState<{ downloadUrl: string; thumbnail: string; title: string } | null>(null);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.includes('twitter.com') && !url.includes('x.com')) {
      toast.error('Please enter a valid Twitter/X video URL');
      return;
    }

    setLoading(true);
    setVideoData(null);

    try {
      // In a real implementation, this would be an API call to a backend service
      // For demo purposes, we're simulating a successful response after a delay
      setTimeout(() => {
        // Demo data - in a real app, this would come from the API
        setVideoData({
          downloadUrl: '#',
          thumbnail: 'https://placehold.co/600x400/1da1f2/ffffff?text=Twitter+Video',
          title: 'Twitter/X Video'
        });
        setLoading(false);
        toast.success('Video found! Ready to download.');
      }, 1500);
    } catch (error) {
      setLoading(false);
      toast.error('Failed to fetch video. Please try again.');
    }
  };

  const downloadVideo = () => {
    if (!videoData) return;
    
    // In a real implementation, this would trigger the actual download
    toast('This is a demo. In a real app, the video would download now.', {
      description: 'Backend API implementation required for actual downloads.'
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg text-blue-800">
        <h2 className="font-medium text-lg mb-2">Download Twitter/X Videos</h2>
        <p className="text-sm">Paste a Twitter/X video URL to download the video in high quality.</p>
      </div>
      
      <form onSubmit={handleDownload} className="space-y-4">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://twitter.com/username/status/123456789"
          className="w-full"
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={loading || !url.trim()}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            'Find Video'
          )}
        </Button>
      </form>

      {videoData && (
        <div className="mt-6 border rounded-lg overflow-hidden">
          <div className="aspect-video bg-gray-100">
            <img 
              src={videoData.thumbnail} 
              alt={videoData.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium truncate">{videoData.title}</h3>
            <Button 
              onClick={downloadVideo}
              className="mt-3 w-full bg-blue-500 hover:bg-blue-600"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Video
            </Button>
          </div>
        </div>
      )}
      
      <div className="text-sm text-muted-foreground mt-4">
        <h3 className="font-medium">How to download Twitter/X videos:</h3>
        <ol className="list-decimal list-inside space-y-1 mt-2">
          <li>Find the tweet containing the video you want to download</li>
          <li>Copy the URL from your browser's address bar</li>
          <li>Paste the URL in the input field above</li>
          <li>Click "Find Video" and then "Download Video"</li>
        </ol>
      </div>
    </div>
  );
};

export default TwitterDownloader;
