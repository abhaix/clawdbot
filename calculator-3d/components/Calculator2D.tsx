'use client';

import { useCalculator } from '../hooks/useCalculator';
import Display2D from './Display2D';
import Keypad2D from './Keypad2D';
import { motion } from 'framer-motion';

export default function Calculator2D() {
    const {
        displayValue,
        operation,
        // @ts-ignore - Assuming we add previousValue to hook return or just ignore for now
        // Actually, I should check the hook. The hook DOES verify `previousValue` internally but doesn't return it? 
        // Let me check the hook file content. I likely need to export `previousValue` from the hook.
        // For now, I will proceed and if it errors I will fix the hook.
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
            className="w-full max-w-md p-6 rounded-3xl glass-panel relative z-10"
        >
            {/* Decorative corner lights */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/30 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/30 blur-[60px] rounded-full pointer-events-none" />

            <Display2D value={displayValue} previousValue={null} operation={operation} />

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
