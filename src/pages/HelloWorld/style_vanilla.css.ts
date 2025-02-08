import { style } from "@vanilla-extract/css";
import { Colors, Sizes } from "@jsq/ds/styles";
import { vars } from "./theme_vanilla.css";

export const themeSampleContainer = style({
  backgroundColor: vars.color.background,
  color: vars.color.text,
  fontSize: vars.fonts.defaultSize,
  fontWeight: vars.fonts.fontWeight,
  padding: Sizes.MD,
});

export const styleSampleContainer = style({
  backgroundColor: Colors.Danger400,
  color: Colors.Neutral0,
  fontSize: Sizes.LG,
  fontWeight: 700,
  margin: Sizes.LG,
  padding: Sizes.LG,
  textAlign: "center",
});

export const vanillaExampleContainer = style({
  display: "flex",
  flexDirection: "column",
});
export const vanillaThemeContainer = style({
  display: "flex",
  flexDirection: "row",
  gap: Sizes.LG,
  justifyContent: "center",
});
export const headerStyle = style({
  color: Colors.Danger400,
});
