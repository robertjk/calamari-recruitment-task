interface SpecialistResponse {
  id: number;
  name: string;
  surname: string;
  profession: string;
  photoUrl?: string;
  rating: {
    sum: number;
    count: number;
  };
  favorite: boolean;
}

interface Specialist extends SpecialistResponse {
  fullName: string;
  ratingAverage: number;
}

export { type Specialist, type SpecialistResponse };
