import classNames from "classnames";

import {
  type Specialist as SpecialistType,
  useFavoriteSpecialistMutation,
} from "%store/apiSlice";

import { IconButton } from "../IconButton";
import { RatingPanel } from "../RatingPanel";
import styles from "./Specialist.module.css";

interface SpecialistProps {
  specialist: SpecialistType;
}

function Specialist({ specialist }: SpecialistProps) {
  const [favoriteSpecialist] = useFavoriteSpecialistMutation();

  const photoAlt = `${specialist.fullName}'s photograph`;

  const favoriteButtonText = specialist.favorite
    ? "Remove from favorites"
    : "Add to favorites";
  const favoriteButtonIcon = specialist.favorite ? "heartFilled" : "heartClear";

  function handleFavoritesClick() {
    async function asyncWrapper() {
      const { id, favorite } = specialist;
      await favoriteSpecialist({ id, favorite: !favorite }).unwrap();
    }

    asyncWrapper().catch(() => {
      throw new Error(`Toggling favorite status`);
    });
  }

  return (
    <li className={styles.root}>
      <h2 className={styles.name}>{specialist.fullName}</h2>
      <h3 className={styles.profession}>{specialist.profession}</h3>
      <img src={specialist.photoUrl} alt={photoAlt} className={styles.photo} />
      <div className={styles.actions}>
        <IconButton
          className={styles.favorite}
          icon={favoriteButtonIcon}
          onClick={handleFavoritesClick}
        >
          {favoriteButtonText}
        </IconButton>
        <IconButton
          className={styles.more}
          icon="threeDots"
          title="This functionality doesn't work yet"
        >
          More
        </IconButton>
        <IconButton
          className={classNames(styles.tileButton, styles.alert)}
          icon="bell"
          title="This functionality doesn't work yet"
        >
          Set alert
        </IconButton>
        <IconButton
          className={classNames(styles.tileButton, styles.calendar)}
          icon="calendar"
          title="This functionality doesn't work yet"
        >
          Calendar
        </IconButton>
        <IconButton
          className={classNames(styles.tileButton, styles.message)}
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
      <RatingPanel className={styles.ratingsPanel} specialist={specialist} />
    </li>
  );
}

export { Specialist };
