import { Clock, Calendar as CalendarIcon, Sparkles } from 'lucide-react';
import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  return (
    <div className="min-h-screen pt-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl" />
      </div>

      <section className="relative z-10 flex size-full flex-col gap-8 text-white p-6 max-w-7xl mx-auto">
        {/* Hero Section with Time */}
        <div className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/[0.02] backdrop-blur-xl border border-white/20 p-8 lg:p-12">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10" />
          
          {/* Floating decorative elements */}
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-medium text-white/80">Live</span>
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Time Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <Clock className="h-5 w-5 text-emerald-400" />
                </div>
                <h2 className="text-lg font-semibold text-white/80 tracking-wide uppercase">Current Time</h2>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent leading-none">
                {time}
              </h1>
              
              <div className="flex items-center gap-3 mt-4">
                <div className="p-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                  <CalendarIcon className="h-4 w-4 text-teal-400" />
                </div>
                <p className="text-lg md:text-xl text-white/70 font-medium">
                  {date}
                </p>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="lg:text-right space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Welcome Back!
              </h3>
              <p className="text-white/60 max-w-md lg:ml-auto">
                Ready to connect? Start a new meeting, join an existing one, or schedule for later.
              </p>
            </div>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full hover:translate-x-full transition-transform duration-[2000ms] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none" />
        </div>

        <MeetingTypeList />
      </section>
    </div>
  );
};

export default Home;
