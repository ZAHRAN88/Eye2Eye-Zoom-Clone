'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-gradient-to-b from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-xl border-r border-white/10 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-1 flex-col gap-3">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          
          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                'group relative flex gap-4 items-center p-4 rounded-xl justify-start transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/20',
                {
                  'bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border-emerald-500/30 shadow-lg shadow-emerald-500/10': isActive,
                }
              )}
            >
              {/* Shimmer effect for active items */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl" />
              )}
              
              <div className="relative z-10 flex gap-4 items-center">
                <div className={cn(
                  'p-2 rounded-lg transition-all duration-300',
                  isActive 
                    ? 'bg-emerald-500/20 ring-1 ring-emerald-500/30' 
                    : 'bg-white/10 group-hover:bg-white/20'
                )}>
                  <Image
                    src={item.imgURL}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="filter brightness-110"
                  />
                </div>
                <p className={cn(
                  "text-base font-medium max-lg:hidden transition-colors duration-300",
                  isActive ? "text-white" : "text-white/80 group-hover:text-white"
                )}>
                  {item.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
