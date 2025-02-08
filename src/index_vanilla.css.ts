import { globalStyle } from "@vanilla-extract/css";

globalStyle("html, body", {
  width: "100%",
  height: "100%",
  margin: 0,
  padding: 0,
});

globalStyle("h1", {
  textAlign: "center",
});

globalStyle("#jsq-app", {
  display: "flex",
  width: "100%",
  flexDirection: "column",
});
