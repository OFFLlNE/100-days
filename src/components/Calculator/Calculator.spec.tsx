import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './Calculator';

describe('Calculator', () => {
  it('calculates the addition', () => {
    render(<Calculator />);

    const numberFive = screen.getByText('5');
    const addOperator = screen.getByText('+');
    const numberSeven = screen.getByText('7');
    const equals = screen.getByText('=');

    fireEvent.click(numberFive);
    fireEvent.click(addOperator);
    fireEvent.click(numberSeven);
    fireEvent.click(equals);

    expect(screen.getByDisplayValue('12')).toBeInTheDocument();
  });

  it('calculates the multiplication', () => {
    render(<Calculator />);

    const numberFive = screen.getByText('5');
    const multiplyOperator = screen.getByText('*');
    const numberSeven = screen.getByText('7');
    const equals = screen.getByText('=');

    fireEvent.click(numberFive);
    fireEvent.click(multiplyOperator);
    fireEvent.click(numberSeven);
    fireEvent.click(equals);

    expect(screen.getByDisplayValue('35')).toBeInTheDocument();
  });

  it('calculates the subtraction', () => {
    render(<Calculator />);

    const numberFive = screen.getByText('5');
    const subtractOperator = screen.getByText('-');
    const numberSeven = screen.getByText('7');
    const equals = screen.getByText('=');

    fireEvent.click(numberFive);
    fireEvent.click(subtractOperator);
    fireEvent.click(numberSeven);
    fireEvent.click(equals);

    expect(screen.getByDisplayValue('-2')).toBeInTheDocument();
  });

  it('calculates the division', () => {
    render(<Calculator />);

    const numberThree = screen.getByText('3');
    const numberFive = screen.getByText('5');
    const divideOperator = screen.getByText('/');
    const numberSeven = screen.getByText('7');
    const equals = screen.getByText('=');

    fireEvent.click(numberThree);
    fireEvent.click(numberFive);
    fireEvent.click(divideOperator);
    fireEvent.click(numberSeven);
    fireEvent.click(equals);

    expect(screen.getByDisplayValue('5')).toBeInTheDocument();
  });
});
