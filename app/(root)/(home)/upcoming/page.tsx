import { Clock } from 'lucide-react';
import CallList from '@/components/CallList';

const UpcomingPage = () => {
  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <section className="relative z-10 flex size-full flex-col gap-8 text-white p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border border-white/10 backdrop-blur-sm">
            <Clock className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-white/90">Scheduled</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            Upcoming Meetings
          </h1>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Your scheduled meetings and appointments coming up. Join them when it&apos;s time.
          </p>
        </div>

        {/* Meeting List */}
        <div className="relative">
          <CallList type="upcoming" />
        </div>
      </section>
    </div>
  );
};

export default UpcomingPage;
