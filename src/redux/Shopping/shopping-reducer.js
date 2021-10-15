import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  products: [
    {
      name: "Potato",

      id: 1,

      price: 30,

      available: 1,

      vendor: "Himachal Pvt Ltd",

      category: "Vegtables",

      image:
        "https://image.shutterstock.com/image-photo/raw-potatoes-isolated-on-white-600w-1569986176.jpg",
      quantity: 0,
    },

    {
      name: "Banana",

      id: 2,

      price: 50,

      available: 1,

      category: "Fruits",

      vendor: "Organic farms",

      image:
        "https://image.shutterstock.com/image-photo/bunch-bananas-isolated-on-white-600w-1722111529.jpg",
      quantity: 0,
    },

    {
      name: "Drumsticks",

      id: 3,

      price: 20,

      available: 0,

      category: "Vegtables",

      vendor: "Mallikarjuna farms",

      image:
        "https://image.shutterstock.com/image-photo/drumstick-vegitable-moringa-oleifera-on-600w-1732547711.jpg",
      quantity: 0,
    },

    {
      name: "Orange",

      id: 4,

      price: 25,

      available: 1,

      vendor: "Nagpur farms",

      category: "Fruits",

      image:
        "https://image.shutterstock.com/image-photo/orange-fruit-slices-leaves-isolated-600w-1386912362.jpg",
      quantity: 0,
    },
    {
      name: "Pineapple",

      id: 5,

      price: 75,

      available: 2,

      category: "Fruits",

      vendor: "Organic farms",

      image:
        "https://image.shutterstock.com/image-photo/pineapple-fruit-slice-isolated-on-600w-1937557024.jpg",
      quantity: 0,
    },
    {
      name: "Apple",

      id: 6,

      price: 45,

      available: 2,

      category: "Fruits",

      vendor: "Organic farms",

      image:
        "https://image.shutterstock.com/image-photo/red-apple-isolated-on-white-600w-1727544364.jpg",
      quantity: 0,
    },
  ],
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // Great Item data from products array
      const item = state.products.find(
        (product) => product.id === action.payload.id
      );
      // Check if Item is in cart already
      const inCart = state.cart.find((item) =>
        item.id === action.payload.id ? true : false
      );

      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item.id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
