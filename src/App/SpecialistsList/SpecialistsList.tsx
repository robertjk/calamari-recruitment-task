import { useAppSelector } from "%store";
import { selectSpecialistsCurrentPage } from "%store/specialistsSlice";

import { Specialist } from "./Specialist";
import styles from "./SpecialistsList.module.css";

function SpecialistsList() {
  const specialists = useAppSelector(selectSpecialistsCurrentPage);

  const noSpecialists = specialists.length === 0;

  return noSpecialists ? (
    <p className={styles.root}>No specialists to show</p>
  ) : (
    <ul className={styles.root}>
      {specialists.map((specialist) => (
        <Specialist key={specialist.id} specialist={specialist} />
      ))}
    </ul>
  );
}

export { SpecialistsList };
