import { render, screen } from "@testing-library/react";
import { Sizes } from "@jsq/ds/styles";
import { HelloWorld } from "../HelloWorld";

describe("dummy test suite", () => {
  it("dummy test", () => {
    expect(true).toBe(true);
  });

  it("Dummy component test", () => {
    render(<HelloWorld />);
    expect(screen.getByRole("heading", { name: /hello world/i })).toBeInTheDocument();
  });

  it("Vanilla extract test", () => {
    render(<HelloWorld />);
    screen.getByTestId("grayTheme");
    screen.getByText(
      "This is a sample container for demo of vanilla extract themes - gray theme",
    );
    screen.getByTestId("greenTheme");
    screen.getByText(
      "This is a sample container for demo of vanilla extract themes - green theme",
    );
    expect(
      screen.getByText(
        /this is a sample container for demo of plain styling using vanilla extract/i,
      ),
    ).toHaveStyle({
      fontSize: Sizes.LG,
      fontWeight: 700,
      margin: Sizes.LG,
      padding: Sizes.LG,
      textAlign: "center",
    });
  });
});
