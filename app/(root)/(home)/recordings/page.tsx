import { Play, Video, Archive } from 'lucide-react';
import CallList from '@/components/CallList';

const RecordingsPage = () => {
  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-amber-500/5 to-orange-500/5 rounded-full blur-3xl" />
      </div>

      <section className="relative z-10 flex size-full flex-col gap-8 text-white p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-600/20 border border-white/10 backdrop-blur-sm">
            <Video className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-white/90">Archive</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            Recordings
          </h1>
          
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Access your saved meeting recordings. Review, share, or download for future reference.
          </p>
        </div>

        {/* Recording List */}
        <div className="relative">
          <CallList type="recordings" />
        </div>
      </section>
    </div>
  );
};

export default RecordingsPage;
