import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/** Data extraction with axios via API -start- */
export const fetchStarship = createAsyncThunk(
  "starship/getStarship",
  async (pageNum) => {
    const res = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/?page=${pageNum}`
    );
    return res.data;
  }
);

/** Data extraction with axios via API -end- */

export const starWarsSlice = createSlice({
  name: "starships",
  initialState: {
    items: [],
    filteredStarship: [],
    favorites: [],
    status: "idle",
    error: "",
    mode: JSON.parse(localStorage.getItem("theme")) || false,
  },
  reducers: {
    modeChange: (state) => {
      localStorage.setItem("theme", JSON.stringify(!state.mode));
      state.mode = JSON.parse(localStorage.getItem("theme"));
    },
    filtered: (state, action) => {
      const text = action.payload.toLowerCase();

      const filtered = state.items.filter(
        (item) =>
          item.model.toLowerCase() === text || item.name.toLowerCase() === text
      );
      if (filtered.length > 0) {
        state.filteredStarship = [...filtered];
        state.error = "";
      } else {
        state.error = "Starship not found";
      }
    },
    backStarships: (state) => {
      state.filteredStarship = [];
    },
    addFavorites: (state, action) => {
      const favorite = action.payload;
      const bool = state.favorites.every((item) => item.url !== favorite.url);
      if (bool) {
        state.favorites.push(favorite);
      }
    },
    removeFavorites: (state, action) => {
      const removeUrl = action.payload;
      for (let i = 0; i < state.favorites.length; i++) {
        if (state.favorites[i].url === removeUrl) {
          state.favorites.splice(i, 1);
        }
      }
    },
  },

  extraReducers: {
    [fetchStarship.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStarship.fulfilled]: (state, action) => {
      state.items = [...state.items, ...action.payload.results];
      state.status = "succeeded";
    },

    [fetchStarship.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {
  pageIncrement,
  modeChange,
  filtered,
  backStarships,
  addFavorites,
  removeFavorites,
} = starWarsSlice.actions;
export default starWarsSlice.reducer;
