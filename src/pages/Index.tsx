
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import FacebookDownloader from '@/components/FacebookDownloader';
import TwitterDownloader from '@/components/TwitterDownloader';
import LinkedinDownloader from '@/components/LinkedinDownloader';
import InstagramDownloader from '@/components/InstagramDownloader';
import YouTubeDownloader from '@/components/YouTubeDownloader';

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4 md:px-0">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Social Media Video Downloader</h1>
          <p className="text-muted-foreground">
            Download videos from your favorite social media platforms in seconds
          </p>
        </header>

        <main className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <Tabs defaultValue="facebook" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="facebook" className="flex items-center gap-2">
                <Facebook size={18} />
                <span className="hidden sm:inline">Facebook</span>
              </TabsTrigger>
              <TabsTrigger value="twitter" className="flex items-center gap-2">
                <Twitter size={18} />
                <span className="hidden sm:inline">Twitter</span>
              </TabsTrigger>
              <TabsTrigger value="linkedin" className="flex items-center gap-2">
                <Linkedin size={18} />
                <span className="hidden sm:inline">LinkedIn</span>
              </TabsTrigger>
              <TabsTrigger value="instagram" className="flex items-center gap-2">
                <Instagram size={18} />
                <span className="hidden sm:inline">Instagram</span>
              </TabsTrigger>
              <TabsTrigger value="youtube" className="flex items-center gap-2">
                <Youtube size={18} />
                <span className="hidden sm:inline">YouTube</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="facebook" className="mt-6">
              <FacebookDownloader />
            </TabsContent>
            <TabsContent value="twitter" className="mt-6">
              <TwitterDownloader />
            </TabsContent>
            <TabsContent value="linkedin" className="mt-6">
              <LinkedinDownloader />
            </TabsContent>
            <TabsContent value="instagram" className="mt-6">
              <InstagramDownloader />
            </TabsContent>
            <TabsContent value="youtube" className="mt-6">
              <YouTubeDownloader />
            </TabsContent>
          </Tabs>
        </main>

        <footer className="mt-8 text-center text-sm text-muted-foreground">
          <p>Free social media video downloader. No account required.</p>
          <p className="mt-1">Your video links are processed securely and never stored.</p>
          <p className="mt-4 text-xs opacity-70">My AI Created Website</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
