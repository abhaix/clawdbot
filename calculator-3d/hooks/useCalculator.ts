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
    if (operation && !waitingForNewValue && previousValue) {
      calculate();
    }
    setPreviousValue(displayValue);
    setOperation(nextOperation);
    setWaitingForNewValue(true);
  };

  const calculate = () => {
    if (!previousValue || !operation) return;

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

    setDisplayValue(String(result));
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
      if (waitingForNewValue) return;
      setDisplayValue(displayValue.length > 1 ? displayValue.slice(0, -1) : '0');
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
    operation,
    handleDigit,
    handleOperation,
    calculate,
    handleClear,
    handleDelete,
    handleDecimal
  };
};
