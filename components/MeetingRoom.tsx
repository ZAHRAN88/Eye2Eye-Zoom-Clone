'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import { useRouter, useSearchParams } from 'next/navigation';
import { Users, LayoutList, Monitor, Maximize2, MonitorSpeaker } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Loader from './Loader';
import EndCallButton from './EndCallButton';
import { cn } from '@/lib/utils';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState, useScreenShareState, useHasOngoingScreenShare } = useCallStateHooks();

  const callingState = useCallCallingState();
  const { screenShare, isMute: isScreenSharing } = useScreenShareState();
  const isSomeoneScreenSharing = useHasOngoingScreenShare();

  if (callingState !== CallingState.JOINED) return <Loader />;

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition='bottom' />;
    }
  };

  const layoutOptions = [
    { value: 'grid', label: 'Grid View', icon: Monitor },
    { value: 'speaker-left', label: 'Speaker Left', icon: Maximize2 },
    { value: 'speaker-top', label: 'Speaker Top', icon: Maximize2 },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Ambient background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main video area */}
      <div className="relative flex size-full items-center justify-center pb-24 md:pb-28">
        <div className="flex size-full max-w-[1000px] items-center px-4 md:px-6">
          <CallLayout />
        </div>
        
        {/* Participants sidebar */}
        <div
          className={cn('h-[calc(100vh-120px)]  md:h-[calc(100vh-86px)] hidden ml-2 md:ml-4', {
            'show-block': showParticipants,
          })}
        >
          <div className="h-full bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
            <CallParticipantsList debounceSearchInterval={100} onClose={() => setShowParticipants(false)} />
          </div>
        </div>
      </div>

      {/* Enhanced control bar */}
      <div className="fixed bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-2 md:px-4 w-full max-w-[95vw] md:max-w-none">
        <div className="bg-gradient-to-r from-slate-950/95 to-slate-900/95 backdrop-blur-xl border border-white/20 rounded-lg md:rounded-2xl p-1.5 md:p-4 shadow-2xl shadow-black/50">
          <div className="flex items-center justify-center gap-1 md:gap-4 flex-wrap">
            {/* Main call controls */}
            <div className="flex items-center scale-75 md:scale-100">
              <CallControls onLeave={() => router.push(`/`)} />
            </div>

            {/* Divider - hidden on very small screens */}
            <div className="hidden sm:block h-6 md:h-8 w-px bg-white/20" />

            {/* Layout selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="group relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-md sm:rounded-lg md:rounded-xl backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  aria-label="Change layout"
                  title="Change video layout"
                >
                  <LayoutList size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5 text-white group-hover:text-emerald-300 transition-colors" />
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md sm:rounded-lg md:rounded-xl" />
                </button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                className="bg-gradient-to-b from-slate-950/95 to-slate-900/95 backdrop-blur-xl border border-white/20 text-white rounded-xl p-2 min-w-[160px] md:min-w-[180px]"
                sideOffset={8}
              >
                {layoutOptions.map((option, index) => {
                  const Icon = option.icon;
                  const isActive = layout === option.value;
                  
                  return (
                    <div key={option.value}>
                      <DropdownMenuItem
                        onClick={() => setLayout(option.value as CallLayoutType)}
                        className={cn(
                          "flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2 rounded-lg cursor-pointer transition-all duration-200 focus:outline-none text-xs md:text-sm",
                          isActive 
                            ? "bg-gradient-to-r from-emerald-500/20 to-teal-600/20 text-emerald-300" 
                            : "hover:bg-white/10 text-white/80 hover:text-white"
                        )}
                      >
                        <Icon size={14} className="md:w-4 md:h-4" />
                        <span className="font-medium">{option.label}</span>
                        {isActive && (
                          <div className="ml-auto w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full" />
                        )}
                      </DropdownMenuItem>
                      {index < layoutOptions.length - 1 && (
                        <DropdownMenuSeparator className="bg-white/10 my-0.5 md:my-1" />
                      )}
                    </div>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Call stats - scale down on mobile */}
            <div className="relative scale-75 md:scale-100">
              <CallStatsButton />
            </div>

            {/* Screen Share Button */}
            <button
              onClick={() => screenShare.toggle()}
              disabled={!isScreenSharing && isSomeoneScreenSharing}
              className={cn(
                "group relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border border-white/20 hover:border-white/30 rounded-md sm:rounded-lg md:rounded-xl backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
                isScreenSharing 
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border-emerald-500/30" 
                  : "bg-white/10 hover:bg-white/20",
                (!isScreenSharing && isSomeoneScreenSharing) && "opacity-50 cursor-not-allowed"
              )}
              aria-label={isScreenSharing ? "Stop screen sharing" : "Start screen sharing"}
              title={
                !isScreenSharing && isSomeoneScreenSharing 
                  ? "Someone else is sharing their screen" 
                  : isScreenSharing 
                    ? "Stop screen sharing" 
                    : "Start screen sharing"
              }
            >
              <MonitorSpeaker 
                size={14} 
                className={cn(
                  "sm:w-4 sm:h-4 md:w-5 md:h-5 transition-colors duration-300",
                  isScreenSharing ? "text-emerald-300" : "text-white group-hover:text-emerald-300"
                )} 
              />
              
              {/* Indicator badge for active state */}
              {isScreenSharing && (
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-emerald-400 rounded-full border border-slate-950" />
              )}
              
              {/* Hover effect */}
              {!isScreenSharing && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md sm:rounded-lg md:rounded-xl" />
              )}
            </button>

            {/* Participants toggle */}
            <button 
              onClick={() => setShowParticipants((prev) => !prev)}
              className={cn(
                "group relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 border border-white/20 hover:border-white/30 rounded-md sm:rounded-lg md:rounded-xl backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
                showParticipants 
                  ? "bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border-emerald-500/30" 
                  : "bg-white/10 hover:bg-white/20"
              )}
              aria-label={showParticipants ? "Hide participants" : "Show participants"}
              title={showParticipants ? "Hide participants" : "Show participants"}
            >
              <Users 
                size={14} 
                className={cn(
                  "sm:w-4 sm:h-4 md:w-5 md:h-5 transition-colors duration-300",
                  showParticipants ? "text-emerald-300" : "text-white group-hover:text-emerald-300"
                )} 
              />
              
              {/* Indicator badge for active state */}
              {showParticipants && (
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-emerald-400 rounded-full border border-slate-950" />
              )}
              
              {/* Hover effect */}
              {!showParticipants && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md sm:rounded-lg md:rounded-xl" />
              )}
            </button>

            {/* End call button (for non-personal rooms) */}
            {!isPersonalRoom && (
              <>
                <div className="hidden sm:block h-6 md:h-8 w-px bg-white/20" />
                <div className="scale-75 md:scale-100">
                  <EndCallButton />
                </div>
              </>
            )}
          </div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-600/5 rounded-lg md:rounded-2xl blur-lg -z-10" />
        </div>
      </div>

      {/* Meeting info overlay (top-left) */}
      <div className="absolute top-4 md:top-6 left-4 md:left-6 z-40">
        <div className="bg-gradient-to-r from-slate-950/80 to-slate-900/80 backdrop-blur-lg border border-white/20 rounded-lg md:rounded-xl p-2 md:p-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs md:text-sm font-medium text-white/90">
              {isPersonalRoom ? "Personal Room" : "Meeting in Progress"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
