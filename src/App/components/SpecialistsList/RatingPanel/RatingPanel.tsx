import classNames from "classnames";
import { useState } from "react";

import { type Specialist, useRateSpecialistMutation } from "%store/apiSlice";

import { IconButton } from "../IconButton";
import styles from "./RatingPanel.module.css";

type Rating = 1 | 2 | 3 | 4 | 5;

interface RatingPanelProps {
  className?: string;
  specialist: Specialist;
}

function RatingPanel({ className, specialist }: RatingPanelProps) {
  const [rateSpecialistMutation] = useRateSpecialistMutation();
  const [ratingHovered, setRatingHovered] = useState<Rating | undefined>(
    undefined,
  );

  const ratingAverageRounded = specialist.rating.average.toFixed(1);
  const ratingMine = Number(specialist.rating.mine);

  const createHandleMouseEnter = (rating: Rating) => () => {
    setRatingHovered(rating);
  };

  function handleMouseLeave() {
    setRatingHovered(undefined);
  }

  function isHighlighted(rating: Rating) {
    return (
      (ratingMine && ratingMine >= rating) ||
      (ratingHovered && ratingHovered >= rating)
    );
  }

  const createHandleClick = (rating: Rating) => () => {
    async function asyncWrapper() {
      await rateSpecialistMutation({ id: specialist.id, rating });
    }

    asyncWrapper().catch(() => {
      throw new Error(`Sending the new rating`);
    });
  };

  return (
    <div className={classNames(styles.root, className)}>
      <h3 className={styles.average}>{ratingAverageRounded}</h3>
      <h4 className={styles.count}>({specialist.rating.count})</h4>

      <fieldset className={styles.buttons}>
        {([1, 2, 3, 4, 5] as Rating[]).map((rating) => (
          <IconButton
            key={rating}
            icon="starClear"
            alternateFill={isHighlighted(rating)}
            onMouseEnter={createHandleMouseEnter(rating)}
            onMouseLeave={handleMouseLeave}
            onClick={createHandleClick(rating)}
          >
            {`Rate ${rating.toString()} star`}
          </IconButton>
        ))}
      </fieldset>
    </div>
  );
}

export { RatingPanel, type RatingPanelProps };
