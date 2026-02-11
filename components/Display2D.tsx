# File: components/Display2D.tsx
'use client';

import { motion } from 'framer-motion';

interface Display2DProps {
    value: string;
    previousValue: string | null;
    operation: string | null;
}

export default function Display2D({ value, previousValue, operation }: Display2DProps) {
    return (
        <div className="w-full h-32 mb-4 rounded-2xl glass-panel flex flex-col justify-end items-end p-6 relative overflow-hidden">
            {/* Glow effect behind text */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-500/20 blur-[50px] rounded-full pointer-events-none" /> {/* Changed color from cyan */}

            <div className="text-gray-400 text-sm font-mono h-6 flex items-center space-x-2 z-10">
                {previousValue && (
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="tracking-widest"
                    >
                        {previousValue} {operation}
                    </motion.span>
                )}
            </div>

            <motion.div
                key={value} // Trigger animation on value change
                initial={{ opacity: 0.5, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-green-500 z-10 truncate w-full text-right" {/* Changed gradient colors */}
            >
                {value}
            </motion.div>
        </div>
    );
}
