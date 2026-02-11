// File: components/Display2D.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Display2DProps {
    value: string;
    previousValue: string | null;
    operation: string | null;
}

export default function Display2D({ value, previousValue, operation }: Display2DProps) {
    const displayRef = useRef<HTMLDivElement>(null);

    // Auto-scroll for very long numbers
    useEffect(() => {
        if (displayRef.current) {
            displayRef.current.scrollLeft = displayRef.current.scrollWidth;
        }
    }, [value]);

    return (
        <div className="w-full h-36 mb-4 rounded-2xl glass-panel flex flex-col justify-end items-end p-6 relative overflow-hidden">
            {/* Subtle glow effect behind text */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-neon-cyan/20 blur-[60px] rounded-full pointer-events-none" />

            <div className="text-gray-400 text-sm font-mono h-6 flex items-center space-x-2 z-10 mb-2 opacity-70"> {/* Refined previous value styling */}
                {previousValue && (
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="tracking-wide"
                    >
                        {previousValue} {operation}
                    </motion.span>
                )}
            </div>

            <div
                ref={displayRef}
                className="w-full text-right overflow-x-auto whitespace-nowrap scrollbar-hide" // Allow horizontal scroll for long numbers
            >
                <motion.div
                    key={value} // Trigger animation on value change
                    initial={{ opacity: 0.5, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan to-neon-blue z-10 min-w-full inline-block" // Ensure gradient covers full width
                    style={{ lineHeight: 1 }} // Adjust line height for better vertical alignment
                >
                    {value}
                </motion.div>
            </div>
        </div>
    );
}
