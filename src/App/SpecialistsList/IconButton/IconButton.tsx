import classNames from "classnames";
import { type MouseEvent, type ReactNode } from "react";

import styles from "./IconButton.module.css";

type Icon = "bell" | "calendar" | "heart" | "mail" | "threeDots";

interface IconButtonProps {
  children: ReactNode;
  className?: string;
  icon: Icon;
  onClick?: (event: MouseEvent) => void;
  title?: string;
}

function IconButton({
  children,
  className,
  icon,
  onClick = () => undefined,
  title = "",
}: IconButtonProps) {
  const iconClassName = styles[`icon_${icon}`];

  return (
    <button
      className={classNames(styles.root, iconClassName, className)}
      onClick={onClick}
      title={title}
    >
      <span className={styles.visuallyHiddenText}>{children}</span>
    </button>
  );
}

export { IconButton, type IconButtonProps };
