/* eslint-disable camelcase */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Users, Calendar, Video, Clock, Link2 } from 'lucide-react';

import MeetingModal from './MeetingModal';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import Loader from './Loader';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { useToast } from './ui/use-toast';
import { Input } from './ui/input';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};

interface MeetingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  onClick: () => void;
  delay?: number;
}

const MeetingCard = ({ icon, title, description, className = '', onClick, delay = 0 }: MeetingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-2xl p-6 cursor-pointer
        backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5
        border border-white/20 hover:border-white/30
        shadow-lg hover:shadow-2xl
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-between h-full min-h-[160px]">
        <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
          {icon}
        </div>
        
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-white/70 group-hover:text-white/80 transition-colors">
            {description}
          </p>
        </div>
      </div>
      
      {/* Hover effect particles */}
      <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-white/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
    </motion.div>
  );
};

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);
  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ 
          title: 'Please select a date and time',
          description: 'A valid date and time is required to create a meeting.'
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created Successfully',
        description: 'Your meeting has been created and is ready to use.',
      });
    } catch (error) {
      console.error(error);
      toast({ 
        title: 'Failed to create Meeting',
        description: 'There was an error creating your meeting. Please try again.',
        variant: 'destructive'
      });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  const meetingTypes = [
    {
      icon: <Plus className="w-6 h-6 text-emerald-300" />,
      title: "New Meeting",
      description: "Start an instant meeting",
      onClick: () => setMeetingState('isInstantMeeting'),
      className: "bg-gradient-to-br from-emerald-500/20 to-teal-600/20 hover:from-emerald-400/30 hover:to-teal-500/30",
      delay: 0
    },
    {
      icon: <Users className="w-6 h-6 text-blue-300" />,
      title: "Join Meeting",
      description: "via invitation link",
      onClick: () => setMeetingState('isJoiningMeeting'),
      className: "bg-gradient-to-br from-blue-500/20 to-indigo-600/20 hover:from-blue-400/30 hover:to-indigo-500/30",
      delay: 0.1
    },
    {
      icon: <Calendar className="w-6 h-6 text-purple-300" />,
      title: "Schedule Meeting",
      description: "Plan your meeting",
      onClick: () => setMeetingState('isScheduleMeeting'),
      className: "bg-gradient-to-br from-purple-500/20 to-pink-600/20 hover:from-purple-400/30 hover:to-pink-500/30",
      delay: 0.2
    },
    {
      icon: <Video className="w-6 h-6 text-amber-300" />,
      title: "View Recordings",
      description: "Meeting Recordings",
      onClick: () => router.push('/recordings'),
      className: "bg-gradient-to-br from-amber-500/20 to-orange-600/20 hover:from-amber-400/30 hover:to-orange-500/30",
      delay: 0.3
    }
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Meeting Options
        </h2>
        <p className="text-white/70">
          Choose how you&apos;d like to connect with your team
        </p>
      </motion.div>

      {/* Meeting Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {meetingTypes.map((meeting, index) => (
          <MeetingCard
            key={meeting.title}
            icon={meeting.icon}
            title={meeting.title}
            description={meeting.description}
            className={meeting.className}
            onClick={meeting.onClick}
            delay={meeting.delay}
          />
        ))}
      </div>

      {/* Schedule Meeting Modal */}
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="flex items-center text-sm font-medium text-white/90">
                <Calendar className="w-4 h-4 mr-2" />
                Add a description
              </label>
              <Textarea
                placeholder="What's this meeting about?"
                className="border-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 focus:bg-white/15 transition-all duration-200 resize-none"
                onChange={(e) =>
                  setValues({ ...values, description: e.target.value })
                }
              />
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center text-sm font-medium text-white/90">
                <Clock className="w-4 h-4 mr-2" />
                Select Date and Time
              </label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => setValues({ ...values, dateTime: date! })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded-lg bg-white/10 backdrop-blur-sm p-3 text-white placeholder:text-white/50 focus:bg-white/15 transition-all duration-200 border-0 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ 
              title: 'Link Copied',
              description: 'Meeting link has been copied to your clipboard.'
            });
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      {/* Join Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Join Meeting"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <div className="space-y-3">
          <label className="flex items-center text-sm font-medium text-white/90 justify-center">
            <Link2 className="w-4 h-4 mr-2" />
            Enter meeting link
          </label>
          <Input
            placeholder="https://your-meeting-link.com"
            onChange={(e) => setValues({ ...values, link: e.target.value })}
            className="border-0 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/50 focus:bg-white/15 transition-all duration-200 focus:ring-2 focus:ring-white/30"
          />
        </div>
      </MeetingModal>

      {/* Instant Meeting Modal */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </div>
  );
};

export default MeetingTypeList;
