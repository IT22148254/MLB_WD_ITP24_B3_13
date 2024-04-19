export const addDecimals = (num) => {
  return Number(num).toFixed(2);
};

export const updateCart = (state) => {
  //calculate item price

  state.itemPrice = state.cartItems.reduce(
    (acc, item) => (acc += addDecimals(item.price) * Number(item.quantity)),
    0
  );

  //calculate delivary price

  state.delPrice = addDecimals(state.itemPrice) > 6000 ? 0 : 500;

  //calculate total price

  state.totPrice = (Number(state.itemPrice) + Number(state.delPrice)).toFixed(
    2
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
