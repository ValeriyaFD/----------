import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./reducers/ticketsSlice";
import filtersReducer from "./reducers/filtersSlice";
import sortReducer from "./reducers/sortSlice";

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    filters: filtersReducer,
    sort: sortReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
