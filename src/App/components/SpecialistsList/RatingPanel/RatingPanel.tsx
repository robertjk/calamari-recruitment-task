import classNames from "classnames";

import { type Specialist } from "%store/apiSlice/apiSlice";

import { IconButton } from "../IconButton";
import styles from "./RatingPanel.module.css";

interface RatingPanelProps {
  className?: string;
  specialist: Specialist;
}

function RatingPanel({ className, specialist }: RatingPanelProps) {
  const ratingAverageRounded = Number(specialist.ratingAverage.toFixed(1));

  return (
    <div className={classNames(styles.root, className)}>
      <h3 className={styles.average}>{ratingAverageRounded}</h3>
      <h4 className={styles.count}>({specialist.rating.count})</h4>
      <fieldset className={styles.buttons}>
        <IconButton icon="starClear">Rate 1 star</IconButton>
        <IconButton icon="starClear">Rate 2 stars</IconButton>
        <IconButton icon="starClear">Rate 3 stars</IconButton>
        <IconButton icon="starClear">Rate 4 stars</IconButton>
        <IconButton icon="starClear">Rate 5 stars</IconButton>
      </fieldset>
    </div>
  );
}

export { RatingPanel, type RatingPanelProps };