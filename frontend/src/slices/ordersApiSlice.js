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
    }),
    getAllOrders:builder.query({
      query:() => ({
        url:`/product/orderst/`
      }),
    }),
    updatePayment:builder.mutation({
      query:(data) => ({
        url:`/product/orderst/${data._id}/pay`,
        method:"PUT",
        body:data
      }),
    }),
    updateDelivarry:builder.mutation({
      query:(data) => ({
        url:`/product/orderst/${data._id}/deliver`,
        method:"PUT",
        body:data
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery,useGetMyOrdersQuery } =
  ordersApiSlice;
