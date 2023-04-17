import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  book: {
    fillForm: localStorage.getItem("fillForm")
      ? JSON.parse(localStorage.getItem("fillForm"))
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
    bookItems: localStorage.getItem("bookItems")
      ? JSON.parse(localStorage.getItem("bookItems"))
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "ADD_BOOK":
      //add to book
      const newBookItem = action.payload;
      const existBookItem = state.book.bookItems.find(
        (item) => item._id === newBookItem._id
      );
      const bookItems = existBookItem
        ? state.book.bookItems.map((item) =>
            item._id === existBookItem._id ? newBookItem : item
          )
        : [...state.book.bookItems, newBookItem];
      localStorage.setItem("bookItems", JSON.stringify(bookItems));
      return { ...state, book: { ...state.book, bookItems } };
    case "REMOVE_BOOK_ITEM": {
      const bookItems = state.book.bookItems.filter(
        (bookItem) => bookItem._id !== action.payload._id
      );
      localStorage.setItem("bookItems", JSON.stringify(bookItems));
      return { ...state, book: { ...state.book, bookItems } };
    }
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        book: {
          bookItems: [],
          fillForm: {},
          paymentMethod: "",
        },
      };
    case "SAVE_FORM_DETAILS":
      return { ...state, book: { ...state.book, fillForm: action.payload } };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        book: { ...state.book, paymentMethod: action.payload },
      };

    case "CLEAR_BOOK":
      return { ...state, book: { ...state.book, bookItems: [] } };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
