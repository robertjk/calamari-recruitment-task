import classNames from "classnames";

import { useAppSelector } from "%store";
import {
  selectSpecialistAverageRating,
  selectSpecialistFullName,
  type Specialist,
} from "%store/specialistsSlice";

import { IconButton } from "../IconButton";
import styles from "./Specialist.module.css";

interface SpecialistProps {
  specialist: Specialist;
}

function Specialist({ specialist }: SpecialistProps) {
  const fullName = useAppSelector((state) =>
    selectSpecialistFullName(state, specialist.id),
  );
  const ratingAverage = useAppSelector((state) =>
    selectSpecialistAverageRating(state, specialist.id),
  );
  const photoAlt = `${fullName}'s photograph`;

  return (
    <li className={styles.root}>
      <h2 className={styles.name}>{fullName}</h2>
      <h3 className={styles.profession}>{specialist.profession}</h3>
      <img src={specialist.photoUrl} alt={photoAlt} className={styles.photo} />
      <div className={styles.actions}>
        <IconButton
          className={styles.favorites}
          icon="heart"
          title="This functionality doesn't work yet"
        >
          Add to favorites
        </IconButton>
        <IconButton
          className={styles.more}
          icon="threeDots"
          title="This functionality doesn't work yet"
        >
          More
        </IconButton>
        <IconButton
          className={styles.alert}
          icon="bell"
          title="This functionality doesn't work yet"
        >
          Set alert
        </IconButton>
        <IconButton
          className={styles.calendar}
          icon="calendar"
          title="This functionality doesn't work yet"
        >
          Calendar
        </IconButton>
        <IconButton
          className={styles.message}
          icon="mail"
          title="This functionality doesn't work yet"
        >
          Send a message
        </IconButton>
        <a
          title="This functionality doesn't work yet"
          className={classNames(styles.textButton, styles.profileLink)}
        >
          Profile
        </a>
        <button
          title="This functionality doesn't work yet"
          className={classNames(styles.textButton, styles.bookVisit)}
        >
          Book a visit
        </button>
      </div>
      <div className={styles.ratingsPanel}>
        <button>Rate 1 star</button>
        <button>Rate 2 stars</button>
        <button>Rate 3 stars</button>
        <button>Rate 4 stars</button>
        <button>Rate 5 stars</button>
        <h3>{ratingAverage}</h3>
        <h4>{specialist.rating.count}</h4>
      </div>
    </li>
  );
}

export { Specialist };
