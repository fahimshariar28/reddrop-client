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

    updateCollaborator: build.mutation({
      query: ({ id, body }) => ({
        url: `/api/collaborator/${id}`,
        method: "PUT",
        contentType: "application/json",
        body,
      }),
      invalidatesTags: ["collaborator"],
    }),

    deleteCollaborator: build.mutation({
      query: (id) => ({
        url: `/api/collaborator/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["collaborator"],
    }),
  }),
});

export const { useGetCollaboratorsQuery, useCreateCollaboratorMutation } =
  collaboratorsApi;
