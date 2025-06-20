import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, UserButton } from '@clerk/nextjs';

import MobileNav from './MobileNav';

const Navbar = () => {
  return (
    <nav className=" mb-2 flex-between fixed z-50 w-full bg-slate-950/95 backdrop-blur-xl border-b border-white/10 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1 group">
        <div className="relative overflow-hidden rounded-xl">
          <Image
            src="/images/I2I.png"
            width={150}
            height={150}
            alt="I2I logo"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
        </div>
      </Link>
      
      <div className="flex-between gap-5">
        <SignedIn>
          <div className="p-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
            <UserButton 
              afterSignOutUrl="/sign-in"
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
