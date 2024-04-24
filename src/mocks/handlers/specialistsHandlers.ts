import { http, HttpResponse } from "msw";

import { type SpecialistResponse } from "%store/apiSlice";

import { specialistsData } from "./specialistsData";

type SpecialistsRecord = Record<SpecialistResponse["id"], SpecialistResponse>;

const specialists = specialistsData.reduce<SpecialistsRecord>(
  (specialistsSoFar: SpecialistsRecord, specialist: SpecialistResponse) => {
    specialistsSoFar[specialist.id] = specialist;
    return specialistsSoFar;
  },
  {},
);

const specialistsHandlers = [
  http.get("/fakeApi/specialists", ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get("type");
    const searchQuery = url.searchParams.get("searchQuery");

    if (!type) {
      return new HttpResponse(null, { status: 404 });
    }

    let specialistsList = Object.values(specialists);
    if (type === "favorites") {
      specialistsList = specialistsList.filter(
        (specialist) => specialist.favorite,
      );
    }
    if (searchQuery) {
      const queryRegExp = new RegExp(searchQuery, "i");
      const matchesSearchQuery = (specialist: SpecialistResponse): boolean =>
        queryRegExp.test(`${specialist.name} ${specialist.surname}`) ||
        queryRegExp.test(specialist.profession);
      specialistsList = specialistsList.filter(matchesSearchQuery);
    }

    return HttpResponse.json(specialistsList);
  }),

  http.patch<
    { id: string },
    { favorite: SpecialistResponse["favorite"] },
    SpecialistResponse
  >("/fakeApi/specialists/:id", async ({ params, request }) => {
    const id = Number(params.id);
    const newFavorite = (await request.json()).favorite;
    specialists[id] = { ...specialists[id], favorite: newFavorite };
    return HttpResponse.json(specialists[id]);
  }),
];

export { specialistsHandlers };
