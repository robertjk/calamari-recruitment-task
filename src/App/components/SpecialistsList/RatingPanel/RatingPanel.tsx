import classNames from "classnames";

import { type Specialist } from "%store/apiSlice";

import { IconButton } from "../IconButton";
import styles from "./RatingPanel.module.css";
import { useState } from "react";

type Rating = 1 | 2 | 3 | 4 | 5 | NaN;

interface RatingPanelProps {
  className?: string;
  specialist: Specialist;
}

function RatingPanel({ className, specialist }: RatingPanelProps) {
  const [ratingHovered, setRatingHovered] = useState<Rating>(NaN);

  const ratingAverageRounded = specialist.rating.average.toFixed(1);
  const ratingMine = Number(specialist.rating.mine);

  const createHandleMouseEnter = (rating: Rating) => () => {
    setRatingHovered(rating);
  };

  function handleMouseLeave() {
    setRatingHovered(undefined);
  }

  function isHighlighted(rating: Rating) {
    return ratingMine >= rating || ratingHovered >= rating;
  }

  return (
    <div className={classNames(styles.root, className)}>
      <h3 className={styles.average}>{ratingAverageRounded}</h3>
      <h4 className={styles.count}>({specialist.rating.count})</h4>

      <fieldset className={styles.buttons}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <IconButton
            key={rating}
            icon="starClear"
            alternateFill={isHighlighted(rating)}
            onMouseEnter={createHandleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
          >
            {`Rate ${rating.toString()} star`}
          </IconButton>
        ))}
      </fieldset>
    </div>
  );
}

export { RatingPanel, type RatingPanelProps };
