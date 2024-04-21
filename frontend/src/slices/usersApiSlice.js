import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `user/login`,
        method:'POST',
        body:data
      }),
    }),   
  }),
});

export const { useLoginMutation } = usersApiSlice;
