import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getSearchResults: build.query({
      query: (query) => ({
        url: `/api/user/filter?${query}`,
        method: "GET",
      }),
    }),

    getProfile: build.query({
      query: (username) => ({
        url: `/api/user/username/${username}`,
        method: "GET",
      }),
    }),

    getMyProfile: build.query({
      query: () => ({
        url: "/api/user/my-profile",
        method: "GET",
      }),
    }),

  }),
});

export const { useGetSearchResultsQuery, useGetProfileQuery } = userApi;
