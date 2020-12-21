import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders input element", () => {
  render(<App />);

  const inputElement = screen.getByPlaceholderText(
    /Search with space separated terms/i,
  );
  expect(inputElement).toBeInTheDocument();
});
