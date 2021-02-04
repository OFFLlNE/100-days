import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator', () => {
  it('calculates the sum', () => {
    render(<Calculator />);

    const addOperator = screen.getByText('+');
    const numberSeven = screen.getByText('7');
    const numberFive = screen.getByText('5');
    const equals = screen.getByText('=');

    fireEvent.click(numberFive);
    fireEvent.click(addOperator);
    fireEvent.click(numberSeven);
    fireEvent.click(equals);

    const sumOfFiveAndSeven = screen.getByDisplayValue('12');

    expect(sumOfFiveAndSeven).toBeInTheDocument();
  });
});
