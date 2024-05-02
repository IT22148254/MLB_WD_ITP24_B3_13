import { apiSlice } from "./apiSlice";

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/product/orderst/add",
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/product/orderst/get/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyOrders:builder.query({
      query:(userId) => ({
        url:`/product/orderst/myorders/${userId}`
      }),
    })
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery,useGetMyOrdersQuery } =
  ordersApiSlice;
