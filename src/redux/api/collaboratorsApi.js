import { baseApi } from "./baseApi";

const collaboratorsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createCollaborator: build.mutation({
      query: (body) => ({
        url: `/api/collaborator`,
        method: "POST",
        contentType: "application/json",
        body,
      }),
      invalidatesTags: ["collaborator"],
    }),

    getCollaborators: build.query({
      query: () => ({
        url: "/api/collaborator",
        method: "GET",
      }),
      providesTags: ["collaborator"],
    }),
  }),
});

export const { useGetCollaboratorsQuery, useCreateCollaboratorMutation } =
  collaboratorsApi;
