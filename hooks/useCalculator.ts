// File: hooks/useCalculator.ts
import { useState } from 'react';

export type Operation = '+' | '-' | '*' | '/' | null;

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
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const handleOperation = (nextOperation: Operation) => {
    // If there's an existing operation and we're not waiting for a new value,
    // calculate the result of the pending operation first.
    if (operation && !waitingForNewValue && previousValue !== null) {
      calculate();
    }
    setPreviousValue(displayValue);
    setOperation(nextOperation);
    setWaitingForNewValue(true);
  };

  const calculate = () => {
    if (previousValue === null || operation === null) return; // Only calculate if previousValue and operation exist

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
    }

    // Handle percentage logic if desired in the future,
    // for now, '%' is handled as a standard operation in the keypad
    // and would simply divide previous by 100 or current by 100 based on context.
    // For a basic calculator, we'll keep it simple: if it's treated as an operation
    // like +, -, *, /, it should apply to the number currently displayed or the previous one.
    // If it's a unary operation, it's different.
    // For now, if the user presses '%', it functions as an operation for division by 100
    // (e.g., if previousValue is 200, operation is '%', and displayValue is not yet input,
    // it could be 200/100. Or, if 50 + 10% means 50 + (50 * 0.1)).
    // Given the current structure, '%' as a binary operator is less intuitive.
    // Let's assume % as an operation meant to divide the *current* displayValue by 100 when pressed.
    // This requires a slight change in handleOperation or calculate, but for basic flow,
    // if '%' is pressed, it might calculate (previous / 100) or (current / 100).
    // Let's adjust handleOperation slightly to manage this if it comes up,
    // but for the sake of standard calculator ops for now, keep as is.

    setDisplayValue(String(result));
    setPreviousValue(null); // Clear previous value after calculation
    setOperation(null); // Clear operation after calculation
    setWaitingForNewValue(true); // Next digit input will start a new number
  };

  const handleClear = () => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleDelete = () => {
      if (waitingForNewValue) return; // Don't delete if waiting for a new number after operation/calculation
      setDisplayValue(displayValue.length > 1 && displayValue !== 'Error' ? displayValue.slice(0, -1) : '0');
  };
  
  const handleDecimal = () => {
      if (waitingForNewValue) {
          setDisplayValue('0.');
          setWaitingForNewValue(false);
          return;
      }
      if (!displayValue.includes('.')) {
          setDisplayValue(displayValue + '.');
      }
  };

  return {
    displayValue,
    previousValue, // <--- EXPORTED HERE
    operation,
    handleDigit,
    handleOperation,
    calculate,
    handleClear,
    handleDelete,
    handleDecimal
  };
};
