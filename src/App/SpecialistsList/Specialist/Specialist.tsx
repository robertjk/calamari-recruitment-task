import { useAppSelector } from "%store";
import {
  selectSpecialistAverageRating,
  selectSpecialistFullName,
  type Specialist,
} from "%store/specialistsSlice";

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
        <button className={styles.favorites}>Add to favorites</button>
        <button className={styles.dots}>More</button>
        <button className={styles.alert}>Set alert</button>
        <button className={styles.calendar}>Calendar</button>
        <button className={styles.message}>Send a message</button>
        <a className={styles.profileLink}>Profile</a>
        <button className={styles.bookVisit}>Book a visit</button>
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
