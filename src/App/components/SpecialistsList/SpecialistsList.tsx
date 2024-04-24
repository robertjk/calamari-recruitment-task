import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { Specialist } from "./Specialist";
import styles from "./SpecialistsList.module.css";

interface SpecialistsListProps {
  error: FetchBaseQueryError | SerializedError | undefined;
  isError: boolean;
  isLoading: boolean;
  specialists?: Specialist[];
}
function SpecialistsList({
  error,
  isError,
  isLoading,
  specialists,
}: SpecialistsListProps) {
  function stringifyError(
    error: FetchBaseQueryError | SerializedError | undefined,
  ): string {
    if (error && "error" in error) {
      return error.error;
    } else if (error && "message" in error && error.message) {
      return error.message;
    } else {
      return "Unknown";
    }
  }

  const noSpecialists = specialists?.length === 0;

  return isLoading ? (
    <p className={styles.root}>Loading...</p>
  ) : isError ? (
    <div className={styles.root}>
      <p>Error loading data:</p>
      <p>{stringifyError(error)}</p>
    </div>
  ) : noSpecialists ? (
    <p className={styles.root}>No specialists to show</p>
  ) : (
    <ul className={styles.root}>
      {specialists?.map((specialist) => (
        <Specialist key={specialist.id} specialist={specialist} />
      ))}
    </ul>
  );
}

export { SpecialistsList };
