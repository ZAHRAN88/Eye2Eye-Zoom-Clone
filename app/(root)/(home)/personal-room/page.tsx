"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { Copy, VideoIcon, Calendar, Share2, Sparkles } from "lucide-react";

import { useGetCallById } from "@/hooks/useGetCallById";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const InfoCard = ({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 hover:border-white/20 hover:from-white/10 hover:to-white/[0.05] hover:shadow-2xl hover:shadow-emerald-500/10">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Icon with glow effect */}
      <div className="relative flex items-start gap-4">
        <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 p-3 ring-1 ring-white/10 group-hover:ring-emerald-500/30 transition-all duration-300">
          <Icon className="h-5 w-5 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
        </div>
        
        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-semibold text-white/80 tracking-wide uppercase">
            {title}
          </h3>
          <p className="text-lg font-medium text-white leading-relaxed break-all">
            {description}
          </p>
        </div>
      </div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
    </div>
  );
};

const PersonalRoom = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const { toast } = useToast();

  const meetingId = user?.id;
  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    const newCall = client.call("default", meetingId!);

    if (!call) {
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    toast({
      title: "✨ Link copied to clipboard!",
      description: "Share your personal meeting room with others",
    });
  };

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl" />
      </div>

      <section className="relative z-10 flex size-full flex-col gap-12 text-white p-8 max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-white/10 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-white/90">Personal Meeting Space</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            Your Meeting Room
          </h1>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            A dedicated space for your personal meetings. Start instantly or share the link with others to join.
          </p>
        </div>

        {/* Meeting Details Cards */}
        <div className="grid gap-6 md:gap-8 max-w-4xl mx-auto w-full">
          <InfoCard 
            title="Room Name" 
            description={`${user?.firstName || user?.username || 'Your'}'s Meeting Room`}
            icon={VideoIcon}
          />
          
          <InfoCard 
            title="Meeting ID" 
            description={meetingId || 'Loading...'}
            icon={Calendar}
          />
          
          <InfoCard 
            title="Invitation Link" 
            description={meetingLink}
            icon={Share2}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto w-full">
          <Button 
            onClick={startRoom}
            className="group relative h-14 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold rounded-2xl border-0 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative flex items-center justify-center gap-2">
              <VideoIcon className="h-5 w-5" />
              <span>Start Meeting</span>
            </div>
          </Button>
          
          <Button
            onClick={copyToClipboard}
            variant="outline"
            className="group relative h-14 bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/30 text-white font-semibold rounded-2xl backdrop-blur-sm transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative flex items-center justify-center gap-2">
              <Copy className="h-5 w-5" />
              <span>Copy Invitation</span>
            </div>
          </Button>
        </div>

        {/* Additional Features Hint */}
        <div className="text-center mt-8">
          <p className="text-sm text-white/40">
            💡 Tip: Your personal room is always available and uses the same meeting ID
          </p>
        </div>
      </section>
    </div>
  );
};

export default PersonalRoom;
