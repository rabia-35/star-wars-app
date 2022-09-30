import { configureStore } from "@reduxjs/toolkit";
import starWarsSlice from "./starWars/starWarsSlice";

export const store = configureStore({
  reducer: {
    starships: starWarsSlice,
  },
});
