import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Page } from "%components/PageSelect";

import { type Specialist, type SpecialistResponse } from "./specialist";

// RTK Query doesn't support relative URL-s in Node test environment
const baseUrl =
  process.env.NODE_ENV === "test" ? `${location.href}fakeApi` : "/fakeApi";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Specialist"],
  endpoints: (builder) => ({
    getSpecialists: builder.query<
      Specialist[],
      { type: Page; searchQuery?: string }
    >({
      query: ({ type, searchQuery }) => ({
        url: `/specialists`,
        params: searchQuery ? { type, searchQuery } : { type },
      }),
      transformResponse: (response: SpecialistResponse[]): Specialist[] => {
        return response.map((specialist) => ({
          ...specialist,
          fullName: `${specialist.name} ${specialist.surname}`,
          rating: {
            ...specialist.rating,
            average: specialist.rating.sum / specialist.rating.count,
          },
        }));
      },
      providesTags: ["Specialist"],
    }),

    favoriteSpecialist: builder.mutation<
      Specialist,
      { id: Specialist["id"]; favorite: Specialist["favorite"] }
    >({
      query: ({ id, favorite }) => ({
        url: `/specialists/${id.toString()}/favorite`,
        method: "PATCH",
        body: {
          favorite,
        },
      }),
      invalidatesTags: ["Specialist"],
    }),

    rateSpecialist: builder.mutation<
      Specialist,
      { id: Specialist["id"]; rating: Specialist["rating"]["mine"] }
    >({
      query: ({ id, rating }) => ({
        url: `/specialists/${id.toString()}/rate`,
        method: "PATCH",
        body: {
          rating,
        },
      }),
      invalidatesTags: ["Specialist"],
    }),
  }),
});

const {
  useFavoriteSpecialistMutation,
  useGetSpecialistsQuery,
  useRateSpecialistMutation,
} = apiSlice;

export {
  apiSlice,
  useFavoriteSpecialistMutation,
  useGetSpecialistsQuery,
  useRateSpecialistMutation,
};
