import * as styles from "./style_vanilla.css";
import { grayTheme, greenTheme } from "./theme_vanilla.css";

export const HelloWorld = () => {
  return (
    <>
      <h1 className={styles.headerStyle}>Hello World, from React + Typescript!</h1>
      <div className={styles.vanillaExampleContainer}>
        <div className={styles.vanillaThemeContainer}>
          <div data-testid={"grayTheme"} className={grayTheme}>
            <div className={styles.themeSampleContainer}>
              This is a sample container for demo of vanilla extract themes - gray theme
            </div>
          </div>
          <div data-testid={"greenTheme"} className={greenTheme}>
            <div className={styles.themeSampleContainer}>
              This is a sample container for demo of vanilla extract themes - green theme
            </div>
          </div>
        </div>
        <div data-testid={"plainStyle"} className={styles.styleSampleContainer}>
          This is a sample container for demo of plain styling using vanilla extract
        </div>
      </div>
    </>
  );
};
