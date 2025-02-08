import { render, screen } from "@testing-library/react";

describe("dummy test suite", () => {
  it("dummy test", () => {
    expect(true).toBe(true);
  });

  it("Dummy component test", () => {
    render(<div>Some text</div>);
    expect(screen.getByText("Some text")).toBeInTheDocument();
  });
});
