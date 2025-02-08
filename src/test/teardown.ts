import path from "path";

export default function teardown(): void {
  // eslint-disable-next-line no-console
  console.log(`
================================================================================
View Coverage Report (Open in Browser): ${path.relative(
    process.cwd(),
    path.join(__dirname, "../coverage/lcov-report/index.html"),
  )}
================================================================================
`);
}
