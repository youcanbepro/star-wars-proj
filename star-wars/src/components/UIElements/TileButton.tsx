import cx from "classnames";
import styles from "./TileButton.module.css";

export interface ITileButton {
  backgroundImage?: string;
  name: string;
  isVisible?: boolean;
  isSelected?: boolean;
  className?: string;
  onClick?: () => void;
  onIconClick?: () => void;
}

export const TileButton: React.FunctionComponent<React.PropsWithChildren<ITileButton>> = (
  props
) => {
  const backgroundImage = {
    background:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(" +
      props.backgroundImage +
      ")",
  };
  const backgroundGradient = {
    background:
      "linear-gradient(0deg, rgba(45, 85, 242, 0.02), rgba(45, 85, 242, 0.02)), linear-gradient(180deg, rgba(31, 31, 31, 0) 0%, rgba(31, 31, 31, 0.6) 100%), rgba(0, 0, 0, 0.8)",
  };

  return (
    <div
      className={cx(
        styles.root,
        props.className,
        props.isVisible ? styles.visible : "",
        props.isSelected ? styles.selected : ""
      )}
      onClick={() => props.onClick && props.onClick()}
      style={props.backgroundImage ? backgroundImage : backgroundGradient}
    >
      <div className={styles.wrapper}>
        <div className={props.isSelected ? styles.selectedName : styles.name}>{props.name}</div>
      </div>
    </div>
  );
};
