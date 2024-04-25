import classNames from "classnames";
import { type MouseEvent } from "react";

import styles from "./IconButton.module.css";
import BellIcon from "./icons/bell.svg?react";
import CalendarIcon from "./icons/calendar.svg?react";
import HeartClearIcon from "./icons/heart-clear.svg?react";
import HeartFilledIcon from "./icons/heart-filled.svg?react";
import MailIcon from "./icons/mail.svg?react";
import StarClearIcon from "./icons/star-clear.svg?react";
import StarFilledIcon from "./icons/star-filled.svg?react";
import ThreeDotsIcon from "./icons/three-dots.svg?react";

type Icon =
  | "bell"
  | "calendar"
  | "heartClear"
  | "heartFilled"
  | "mail"
  | "starClear"
  | "starFilled"
  | "threeDots";

const ICONS = {
  bell: BellIcon,
  calendar: CalendarIcon,
  heartClear: HeartClearIcon,
  heartFilled: HeartFilledIcon,
  mail: MailIcon,
  starClear: StarClearIcon,
  starFilled: StarFilledIcon,
  threeDots: ThreeDotsIcon,
};

interface IconButtonProps {
  children: string;
  changeColorOnHover?: boolean;
  className?: string;
  icon: Icon;
  onClick?: (event: MouseEvent) => void;
  title?: string;
}

function IconButton({
  children,
  changeColorOnHover = false,
  className,
  icon,
  onClick = () => undefined,
  title = "",
}: IconButtonProps) {
  const titleAttr = title || children;

  const Icon = ICONS[icon];

  return (
    <button
      className={classNames(styles.root, className)}
      onClick={onClick}
      title={titleAttr}
    >
      <Icon
        className={classNames({
          [styles.icon]: true,
          [styles.changeColorOnHover]: changeColorOnHover,
        })}
      />
      <span className={styles.visuallyHiddenText}>{children}</span>
    </button>
  );
}

export { IconButton, type IconButtonProps };
