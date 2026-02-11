// File: components/Keypad2D.tsx
'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface Keypad2DProps {
    onDigit: (digit: string) => void;
    onOperation: (op: string) => void;
    onClear: () => void;
    onDelete: () => void;
    onDecimal: () => void;
    onCalculate: () => void;
}

export default function Keypad2D({
    onDigit,
    onOperation,
    onClear,
    onDelete,
    onDecimal,
    onCalculate
}: Keypad2DProps) {

    const buttons = [
        { label: 'C', onClick: onClear, type: 'action', textClass: 'text-neon-pink' },
        { label: 'Del', onClick: onDelete, type: 'action', textClass: 'text-neon-pink' },
        { label: '%', onClick: () => onOperation('%'), type: 'op', textClass: 'text-neon-blue' },
        { label: '/', onClick: () => onOperation('/'), type: 'op', textClass: 'text-neon-blue' },

        { label: '7', onClick: () => onDigit('7'), type: 'num' },
        { label: '8', onClick: () => onDigit('8'), type: 'num' },
        { label: '9', onClick: () => onDigit('9'), type: 'num' },
        { label: 'x', onClick: () => onOperation('*'), type: 'op', textClass: 'text-neon-blue' },

        { label: '4', onClick: () => onDigit('4'), type: 'num' },
        { label: '5', onClick: () => onDigit('5'), type: 'num' },
        { label: '6', onClick: () => onDigit('6'), type: 'num' },
        { label: '-', onClick: () => onOperation('-'), type: 'op', textClass: 'text-neon-blue' },

        { label: '1', onClick: () => onDigit('1'), type: 'num' },
        { label: '2', onClick: () => onDigit('2'), type: 'num' },
        { label: '3', onClick: () => onDigit('3'), type: 'num' },
        { label: '+', onClick: () => onOperation('+'), type: 'op', textClass: 'text-neon-blue' },

        { label: '0', onClick: () => onDigit('0'), type: 'num', span: 2 },
        { label: '.', onClick: onDecimal, type: 'num' },
        { label: '=', onClick: onCalculate, type: 'equals' },
    ];

    return (
        <div className="grid grid-cols-4 gap-4 mt-6"> {/* Slightly more vertical spacing */}
            {buttons.map((btn, idx) => (
                <motion.button
                    key={idx}
                    onClick={btn.onClick}
                    whileHover={{ scale: 1.03, boxShadow: 'var(--button-glow-hover, 0 0 8px rgba(0, 229, 255, 0.4))' }} /* Custom glow on hover */
                    whileTap={{ scale: 0.97 }}
                    className={clsx(
                        "h-16 rounded-xl font-bold text-xl transition-all duration-200 ease-in-out flex items-center justify-center",
                        "glass-button", // Use the new common glass button style
                        btn.span === 2 ? "col-span-2" : "col-span-1",
                        btn.textClass || "text-white opacity-85", // Default text color
                        btn.type === 'equals' && "bg-neon-blue text-background-dark shadow-button-equals-glow border-none hover:bg-neon-cyan hover:text-background-dark" // Unique style for equals button
                    )}
                >
                    {btn.label}
                </motion.button>
            ))}
        </div>
    );
}
