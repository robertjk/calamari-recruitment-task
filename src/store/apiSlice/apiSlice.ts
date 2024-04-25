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

    updateSpecialist: builder.mutation<
      Specialist,
      Pick<Specialist, "id" | "favorite">
    >({
      query: (specialist) => ({
        url: `/specialists/${specialist.id.toString()}`,
        method: "PATCH",
        body: {
          favorite: specialist.favorite,
        },
      }),
      invalidatesTags: ["Specialist"],
    }),
  }),
});

const { useGetSpecialistsQuery, useUpdateSpecialistMutation } = apiSlice;

export { apiSlice, useGetSpecialistsQuery, useUpdateSpecialistMutation };
