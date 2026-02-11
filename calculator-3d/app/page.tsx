'use client';

import Calculator2D from '../components/Calculator2D';

export default function Home() {
  return (
    <main className="h-screen w-full bg-black flex items-center justify-center relative overflow-hidden">
      {/* Background Grid Animation */}
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      {/* Dynamic Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse delay-1000" />

      <Calculator2D />

      <div className="absolute bottom-4 text-gray-500 text-xs font-mono">
        FUTURISTIC CALCULATOR // V2.0
      </div>
    </main>
  );
}
