interface SpecialistResponse {
  id: number;
  name: string;
  surname: string;
  profession: string;
  photoUrl?: string;
  rating: {
    sum: number;
    count: number;
    mine?: number;
  };
  favorite: boolean;
}

interface Specialist extends SpecialistResponse {
  fullName: string;
  rating: SpecialistResponse["rating"] & {
    average: number;
  };
}

export { type Specialist, type SpecialistResponse };
