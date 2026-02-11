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
        { label: 'C', onClick: onClear, type: 'action', color: 'text-red-400' },
        { label: 'Del', onClick: onDelete, type: 'action', color: 'text-red-400' },
        { label: '%', onClick: () => onOperation('%'), type: 'op', color: 'text-cyan-400' },
        { label: '/', onClick: () => onOperation('/'), type: 'op', color: 'text-cyan-400' },

        { label: '7', onClick: () => onDigit('7'), type: 'num' },
        { label: '8', onClick: () => onDigit('8'), type: 'num' },
        { label: '9', onClick: () => onDigit('9'), type: 'num' },
        { label: 'x', onClick: () => onOperation('*'), type: 'op', color: 'text-cyan-400' },

        { label: '4', onClick: () => onDigit('4'), type: 'num' },
        { label: '5', onClick: () => onDigit('5'), type: 'num' },
        { label: '6', onClick: () => onDigit('6'), type: 'num' },
        { label: '-', onClick: () => onOperation('-'), type: 'op', color: 'text-cyan-400' },

        { label: '1', onClick: () => onDigit('1'), type: 'num' },
        { label: '2', onClick: () => onDigit('2'), type: 'num' },
        { label: '3', onClick: () => onDigit('3'), type: 'num' },
        { label: '+', onClick: () => onOperation('+'), type: 'op', color: 'text-cyan-400' },

        { label: '0', onClick: () => onDigit('0'), type: 'num', span: 2 },
        { label: '.', onClick: onDecimal, type: 'num' },
        { label: '=', onClick: onCalculate, type: 'equals', color: 'bg-cyan-500 text-black' },
    ];

    return (
        <div className="grid grid-cols-4 gap-4">
            {buttons.map((btn, idx) => (
                <motion.button
                    key={idx}
                    onClick={btn.onClick}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    className={clsx(
                        "h-16 rounded-xl font-bold text-xl transition-colors glass-panel flex items-center justify-center",
                        btn.span === 2 ? "col-span-2" : "col-span-1",
                        btn.color || "text-white",
                        btn.type === 'equals' && "shadow-[0_0_15px_rgba(6,182,212,0.5)] border-cyan-500"
                    )}
                >
                    {btn.label}
                </motion.button>
            ))}
        </div>
    );
}
