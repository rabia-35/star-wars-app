import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStarship = createAsyncThunk(
  "starship/getStarship",
  async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}`);
    return res.data;
  }
);

export const fetchLoadMoreStarship = createAsyncThunk(
  "starship/getLoadMoreStarship",
  async (page) => {
    const res = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/?page=${page}`
    );
    return res.data;
  }
);

export const searchStarship = createAsyncThunk(
  "starship/searchStarship",
  async (text) => {
    const res = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/?search=${text}`
    );
    console.log(res.data.results);
    return res.data.results;
  }
);

export const starWarsSlice = createSlice({
  name: "starships",
  initialState: {
    items: [],
    filteredStarship: [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    status: "idle",
    error: "",
    mode: JSON.parse(localStorage.getItem("theme")) || false,
    page: 2,
  },
  reducers: {
    savePage: (state, action) => {
      state.page = action.payload;
    },
    modeChange: (state) => {
      localStorage.setItem("theme", JSON.stringify(!state.mode));
      state.mode = JSON.parse(localStorage.getItem("theme"));
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
      state.items.length < 1 && (state.items = [...action.payload.results]);

      state.status = "succeeded";
      state.error = "";
    },

    [fetchStarship.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [fetchLoadMoreStarship.pending]: (state) => {
      state.status = "loading";
    },
    [fetchLoadMoreStarship.fulfilled]: (state, action) => {
      state.items = [...state.items, ...action.payload.results];

      state.status = "succeeded";
      state.error = "";
    },

    [fetchLoadMoreStarship.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    [searchStarship.pending]: (state) => {
      state.status = "loading";
    },
    [searchStarship.fulfilled]: (state, action) => {
      const filtered = action.payload;
      state.filteredStarship = filtered;
      state.status = "succeeded";
      if (filtered.length < 1) {
        state.error = "starship not found";
      }
    },
  },
});

export const {
  pageIncrement,
  modeChange,
  backStarships,
  addFavorites,
  removeFavorites,
  savePage,
} = starWarsSlice.actions;
export default starWarsSlice.reducer;
