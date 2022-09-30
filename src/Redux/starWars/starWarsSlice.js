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

export const fetchStarshipImage = createAsyncThunk(
  "starship/getImage",
  async () => {
    const res = await axios(
      `https://starwars-visualguide.com/assets/img/starships/`
    );
    console.log(res.data);
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
  reducers: {},

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
