import React from "react";
import cx from "classnames";
import styles from "./button.module.css";

export interface IButton {
  labelText?: string;
  subLabelText?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  theme?: "light" | "dark" | "default";
}

const Button: React.FunctionComponent<React.PropsWithChildren<IButton>> = ({
  labelText = "",
  subLabelText,
  className,
  theme,
  onClick,
}) => {
  return (
    <div
      className={cx(className, styles.root, styles[theme!], {
        [styles.textAndSubText]: labelText && subLabelText,
      })}
      onClick={() => onClick && onClick()}
    >
      <div className={styles.buttonLabelText}>{labelText}</div>

      {subLabelText && <div className={styles.buttonLabelSubText}>{subLabelText}</div>}
    </div>
  );
};
export { Button };
