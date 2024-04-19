import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getOneProduct: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/get/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetProductsQuery,useGetOneProductQuery } = productsApiSlice;
