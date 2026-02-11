// File: components/Calculator2D.tsx
'use client';

import { useCalculator } from '../hooks/useCalculator';
import Display2D from './Display2D';
import Keypad2D from './Keypad2D';
import { motion } from 'framer-motion';

export default function Calculator2D() {
    const {
        displayValue,
        previousValue, // <--- NOW ACCESSIBLE
        operation,
        handleDigit,
        handleOperation,
        handleClear,
        handleDelete,
        handleDecimal,
        calculate
    } = useCalculator();

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md p-6 rounded-3xl glass-panel relative z-10 border-glass-border shadow-[0_0_50px_rgba(0,0,0,0.6)]" /* Enhanced glass panel shadow */
        >
            {/* Decorative corner lights - using new colors, slightly more subtle */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-neon-purple/20 blur-[50px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-neon-cyan/20 blur-[50px] rounded-full pointer-events-none" />

            <Display2D value={displayValue} previousValue={previousValue} operation={operation} />

            <Keypad2D
                onDigit={handleDigit}
                onOperation={(op) => handleOperation(op as any)}
                onClear={handleClear}
                onDelete={handleDelete}
                onDecimal={handleDecimal}
                onCalculate={calculate}
            />
        </motion.div>
    );
}
