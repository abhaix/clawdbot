# File: hooks/useCalculator.ts
import { useState } from 'react';

export type Operation = '+' | '-' | '*' | '/' | '%' | null; // Added '%' operation type

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const handleDigit = (digit: string) => {
    if (waitingForNewValue) {
      setDisplayValue(digit);
      setWaitingForNewValue(false);
    } else {
      // Prevent multiple leading zeros unless it's a decimal
      if (displayValue === '0' && digit !== '.') {
        setDisplayValue(digit);
      } else if (displayValue === 'Error') { // Clear error state if a digit is pressed
        setDisplayValue(digit);
        setPreviousValue(null);
        setOperation(null);
      }
      else {
        setDisplayValue(displayValue + digit);
      }
    }
  };

  const handleOperation = (nextOperation: Operation) => {
    if (displayValue === 'Error') { // Clear error state if an operation is attempted
        setPreviousValue(null);
        setOperation(nextOperation);
        setWaitingForNewValue(true);
        return;
    }

    if (previousValue && operation && !waitingForNewValue) {
      // If there's a previous calculation pending, compute it first
      calculate(); 
      // After calculate, displayValue holds the result, which becomes the new previousValue
      setPreviousValue(displayValue); 
      setOperation(nextOperation);
      setWaitingForNewValue(true);
    } else if (displayValue !== '0' || previousValue) { // Allow setting first operation or changing operation
      setPreviousValue(displayValue);
      setOperation(nextOperation);
      setWaitingForNewValue(true);
    }
  };

  const calculate = () => {
    if (!previousValue || !operation) return; // Cannot calculate without previous value and operation

    const current = parseFloat(displayValue);
    const previous = parseFloat(previousValue);
    let result = 0;

    switch (operation) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        if (current === 0) {
            setDisplayValue('Error');
            setOperation(null);
            setPreviousValue(null);
            setWaitingForNewValue(true);
            return;
        }
        result = previous / current;
        break;
      case '%':
          // Common calculator logic: 100 + 10 % means 100 + (100 * 0.10)
          // For simplicity, let's implement it as (previous * current / 100)
          result = (previous * current) / 100;
          break;
    }

    // Handle floating point precision issues (simple fix for display)
    const resultString = String(result);
    if (resultString.includes('.') && resultString.split('.')[1].length > 10) {
        setDisplayValue(result.toFixed(10).replace(/\.?0+$/, '')); // Limit to 10 decimal places and remove trailing zeros
    } else {
        setDisplayValue(resultString);
    }
    
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(true);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDelete = () => {
      if (waitingForNewValue || displayValue === 'Error') return; // Don't delete if waiting for new value or in error state
      setDisplayValue(displayValue.length > 1 && displayValue !== '0' ? displayValue.slice(0, -1) : '0');
  };
  
  const handleDecimal = () => {
      if (waitingForNewValue) {
          setDisplayValue('0.');
          setWaitingForNewValue(false);
          return;
      }
      if (displayValue === 'Error') { // If in error state, start new '0.'
          setDisplayValue('0.');
          setPreviousValue(null);
          setOperation(null);
          setWaitingForNewValue(false);
          return;
      }
      if (!displayValue.includes('.')) {
          setDisplayValue(displayValue + '.');
      }
  };

  return {
    displayValue,
    previousValue, // Exporting previousValue for display
    operation,
    handleDigit,
    handleOperation,
    calculate,
    handleClear,
    handleDelete,
    handleDecimal
  };
};
