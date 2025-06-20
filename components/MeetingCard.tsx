"use client";

import Image from "next/image";
import { Copy, ExternalLink, Play } from "lucide-react";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link);
    toast({
      title: "✨ Link copied to clipboard!",
      description: "Share this meeting with others",
    });
  };

  return (
    <section className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 hover:border-white/20 hover:from-white/15 hover:to-white/[0.05] hover:shadow-2xl hover:shadow-white/10 min-h-[280px] flex flex-col justify-between">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <article className="relative z-10 flex flex-col gap-6">
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 p-3 ring-1 ring-white/10 group-hover:ring-emerald-500/30 transition-all duration-300">
          <Image 
            src={icon} 
            alt="meeting icon" 
            width={24} 
            height={24}
            className="filter brightness-110"
          />
        </div>
        
        {/* Meeting Details */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-white group-hover:text-white/90 transition-colors line-clamp-2">
            {title}
          </h1>
          <p className="text-sm text-white/70 group-hover:text-white/80 transition-colors">
            {date}
          </p>
        </div>
      </article>

      {/* Actions */}
      <article className="relative z-10 mt-6">
        {!isPreviousMeeting && (
          <div className="flex gap-3">
            <Button 
              onClick={handleClick} 
              className="group/btn relative flex-1 h-11 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-medium rounded-xl border-0 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              <div className="relative flex items-center justify-center gap-2">
                {buttonIcon1 ? (
                  <Image src={buttonIcon1} alt="action" width={16} height={16} />
                ) : buttonText === "Play" ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <ExternalLink className="h-4 w-4" />
                )}
                <span className="text-sm">{buttonText}</span>
              </div>
            </Button>
            
            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="group/btn relative h-11 bg-white/5 hover:bg-white/10 border-white/20 hover:border-white/30 text-white font-medium rounded-xl backdrop-blur-sm transition-all duration-300 overflow-hidden px-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              <div className="relative">
                <Copy className="h-4 w-4" />
              </div>
            </Button>
          </div>
        )}
      </article>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />
    </section>
  );
};

export default MeetingCard;
