import { baseApi } from "./baseApi";

const requestApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createRequest: build.mutation({
            query: (data) => {
                return {
                    url: "/api/request",
                    method: "POST",
                    data,
                }
            },
            invalidatesTags: ["request"],
        }),
    }),
});

export const { useCreateRequestMutation } = requestApi;
