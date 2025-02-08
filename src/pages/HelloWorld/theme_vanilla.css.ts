import { createTheme, createThemeContract } from "@vanilla-extract/css";
import { Colors, Sizes } from "@jsq/ds/styles";
export const vars = createThemeContract({
  color: {
    background: null,
    text: null,
  },
  fonts: {
    heading: null,
    body: null,
    defaultSize: null,
    fontWeight: null,
  },
  space: {
    small: null,
    medium: null,
  },
});
export const grayTheme = createTheme(vars, {
  color: {
    background: Colors.Neutral400,
    text: Colors.Neutral0,
  },
  fonts: {
    heading: "Georgia, Times, Times New Roman, serif",
    body: "system-ui",
    defaultSize: "1.2rem",
    fontWeight: "bold",
  },
  space: {
    small: Sizes.XS,
    medium: Sizes.SM,
  },
});
export const greenTheme = createTheme(vars, {
  color: {
    background: Colors.Success400,
    text: Colors.Warning400,
  },
  fonts: {
    heading: "Georgia, Times, Times New Roman, serif",
    body: "system-ui",
    defaultSize: "1.2rem",
    fontWeight: "bold",
  },
  space: {
    small: Sizes.XS,
    medium: Sizes.SM,
  },
});
