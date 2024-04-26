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

  let specialistPhoto;
  if (specialist.photoUrl) {
    specialistPhoto = (
      <img src={specialist.photoUrl} alt={photoAlt} className={styles.photo} />
    );
  } else {
    const initials =
      specialist.name[0].toUpperCase() + specialist.surname[0].toUpperCase();
    specialistPhoto = <span className={styles.photo}>{initials}</span>;
  }

  return (
    <li className={styles.root}>
      <IconButton
        className={styles.more}
        disabled
        icon="threeDots"
        title="This functionality doesn't work yet"
      >
        More
      </IconButton>
      <IconButton
        className={styles.favorite}
        icon={favoriteButtonIcon}
        onClick={handleFavoritesClick}
      >
        {favoriteButtonText}
      </IconButton>
      <h2 className={styles.name}>{specialist.fullName}</h2>
      <h3 className={styles.profession}>{specialist.profession}</h3>
      {specialistPhoto}
      <IconButton
        className={classNames(styles.tileButton, styles.alert)}
        disabled
        icon="bell"
        title="This functionality doesn't work yet"
      >
        Set alert
      </IconButton>
      <IconButton
        className={classNames(styles.tileButton, styles.calendar)}
        disabled
        icon="calendar"
        title="This functionality doesn't work yet"
      >
        Calendar
      </IconButton>
      <IconButton
        className={classNames(styles.tileButton, styles.message)}
        disabled
        icon="mail"
        title="This functionality doesn't work yet"
      >
        Send a message
      </IconButton>
      <RatingPanel className={styles.ratingsPanel} specialist={specialist} />
      <a
        title="This functionality doesn't work yet"
        className={classNames(styles.textButton, styles.profileLink)}
      >
        Profile
      </a>
      <button
        title="This functionality doesn't work yet"
        disabled
        className={classNames(styles.textButton, styles.bookVisit)}
      >
        Book a visit
      </button>
    </li>
  );
}

export { Specialist };
