# File: components/Calculator2D.tsx
'use client';

import { useCalculator } from '../hooks/useCalculator';
import Display2D from './Display2D';
import Keypad2D from './Keypad2D';
import { motion } from 'framer-motion';

export default function Calculator2D() {
    const {
        displayValue,
        operation,
        previousValue, // Use the previousValue from the hook
        handleDigit,
        handleOperation,
        handleClear,
        handleDelete,
        handleDecimal,
        calculate
    } = useCalculator();

    return (
        <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.9 }} // Changed y: 50 to y: 0
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-md p-6 rounded-3xl glass-panel relative z-10"
        >
            {/* Decorative corner lights */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/30 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/30 blur-[60px] rounded-full pointer-events-none" />

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
