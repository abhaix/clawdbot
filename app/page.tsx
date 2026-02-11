// File: app/page.tsx
'use client';

import Calculator2D from '../components/Calculator2D';

export default function Home() {
  return (
    <main className="h-screen w-full bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Dynamic Background Blobs - using new colors and refined animation */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/30 rounded-full blur-[100px] animate-pulse-medium" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/30 rounded-full blur-[100px] animate-pulse-medium delay-1000" />
      <div className="absolute top-[10%] right-[15%] w-64 h-64 bg-neon-pink/20 rounded-full blur-[100px] animate-pulse-slow delay-500" /> {/* Added a third blob */}

      <Calculator2D />

      <div className="absolute bottom-8 text-gray-500 text-sm font-mono tracking-widest opacity-70"> {/* Refined footer text */}
        FUTURISTIC CALCULATOR // V2.1
      </div>
    </main>
  );
}
