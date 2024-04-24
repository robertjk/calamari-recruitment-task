import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Page } from "%components/PageSelect";

import { type Specialist, type SpecialistResponse } from "./specialist";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/fakeApi" }),
  tagTypes: ["Specialist"],
  endpoints: (builder) => ({
    getSpecialists: builder.query<
      Specialist[],
      { type: Page; searchQuery?: string }
    >({
      query: ({ type, searchQuery }) => ({
        url: `/specialists`,
        params: {
          type,
          searchQuery,
        },
      }),
      transformResponse: (response: SpecialistResponse[]): Specialist[] => {
        return response.map((specialist) => ({
          ...specialist,
          fullName: `${specialist.name} ${specialist.surname}`,
          ratingAverage: specialist.rating.sum / specialist.rating.count,
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
