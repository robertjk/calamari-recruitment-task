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

  http.patch<{ id: string }, { favorite: SpecialistResponse["favorite"] }>(
    "/fakeApi/specialists/:id/favorite",
    async ({ params, request }) => {
      const id = Number(params.id);
      const newFavorite = (await request.json()).favorite;
      specialists[id] = { ...specialists[id], favorite: newFavorite };
      return new HttpResponse(null, { status: 204 });
    },
  ),

  http.patch<{ id: string }, { rating: number }>(
    "/fakeApi/specialists/:id/rate",
    async ({ params, request }) => {
      const id = Number(params.id);
      const specialistRating = specialists[id].rating;
      const createsNewRating = !specialistRating.mine;
      const newMine = (await request.json()).rating;
      const newCount = createsNewRating
        ? specialistRating.count + 1
        : specialistRating.count;
      const newSum =
        specialistRating.sum + newMine - (specialistRating.mine ?? 0);

      specialists[id] = {
        ...specialists[id],
        rating: {
          sum: newSum,
          count: newCount,
          mine: newMine,
        },
      };
      return new HttpResponse(null, { status: 204 });
    },
  ),
];

export { specialistsHandlers };
