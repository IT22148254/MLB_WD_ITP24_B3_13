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
    getMyOrders: builder.query({
      query: (userId) => ({
        url: `/product/orderst/myorders/${userId}`,
      }),
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: `/product/orderst/`,
      }),
    }),
    updatePayment: builder.mutation({
      query: (data) => ({
        url: `/product/orderst/${data._id}/pay`,
        method: "PUT",
        body: data,
      }),
    }),
    updateDelivary: builder.mutation({
      query: (data) => ({
        url: `/product/orderst/${data._id}/deliver`,
        method: "PUT",
        body: data,
      }),
    }),
    updateOrder: builder.mutation({
      query: (data) => ({
        url: `/product/orderst/${data._id}`,
        method: "PUT",
        body: data,
      }),
    }),
    removeOrder: builder.mutation({
      query: (orderId) => ({
        url: `/product/orderst/${orderId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateDelivaryMutation,
  useUpdatePaymentMutation,
  useRemoveOrderMutation,
  useUpdateOrderMutation
} = ordersApiSlice;
