import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/** fetchStarship start */
export const fetchStarship = createAsyncThunk(
  "starship/getStarship",
  async (pageNum) => {
    const res = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/?page=${pageNum}`
    );
    return res.data;
  }
);

/** fetchStarship ending */

export const starWarsSlice = createSlice({
  name: "starships",
  initialState: {
    items: [],
    filteredStarship: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
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
      state.filteredStarship = [];
      const filtered = state.items.filter(
        (item) =>
          item.model.toLowerCase().includes(text) ||
          item.name.toLowerCase().includes(text)
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

      if (!localStorage.favorites) {
        localStorage.setItem("favorites", JSON.stringify([favorite]));
      } else {
        let localFavorites = JSON.parse(localStorage.getItem("favorites"));
        const bool = localFavorites.every((item) => item.url !== favorite.url);

        if (bool) {
          localFavorites.push(favorite);
          localStorage.setItem("favorites", JSON.stringify(localFavorites));
        }
      }
      state.favorites = JSON.parse(localStorage.getItem("favorites"));
    },
    removeFavorites: (state, action) => {
      const removeUrl = action.payload;
      let localFavorites = JSON.parse(localStorage.getItem("favorites"));

      for (let i = 0; i < localFavorites.length; i++) {
        if (localFavorites[i].url === removeUrl) {
          localFavorites.splice(i, 1);
        }
      }
      localStorage.setItem("favorites", JSON.stringify(localFavorites));
      state.favorites = JSON.parse(localStorage.getItem("favorites"));
    },
  },

  extraReducers: {
    [fetchStarship.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStarship.fulfilled]: (state, action) => {
      if (state.items.length < 31) {
        state.items = [...state.items, ...action.payload.results];
      }
      state.status = "succeeded";
      state.error = "";
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
