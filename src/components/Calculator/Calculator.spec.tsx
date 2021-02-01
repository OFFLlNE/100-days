import React from "react";
import {render, screen, fireEvent} from "@testing-library/react";
import Calculator from "./Calculator";

describe("Calculator", () => {
  it("calculates the sum", () => {
    render(<Calculator />);

    const addOperator = screen.getByLabelText("+");
    const numberSeven = screen.getByLabelText("7");
    const numberFive = screen.getByLabelText("5");
    const equals = screen.getByLabelText("=");

    fireEvent.click(numberFive);
    fireEvent.click(addOperator);
    fireEvent.click(numberSeven);
    fireEvent.click(equals);

    const sumOfFiveAndSeven = screen.getByText("12");

    expect(sumOfFiveAndSeven).toBeInTheDocument();
  });
});
