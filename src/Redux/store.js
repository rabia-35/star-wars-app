import { configureStore } from "@reduxjs/toolkit";
import starWarsSlice from "./StarWarsSlice";

export const store = configureStore({
  reducer: {
    starships: starWarsSlice,
  },
});
