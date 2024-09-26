import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileArray: [
    {
      name: "Default",
      className: "default",
      isActive: true,
      id: "profile1",
    },
    {
      name: "Game",
      className: "no-edit game",
      id: "profile2",
      isActive: false,
    },
    {
      name: "Movie",
      className: "no-edit movie",
      id: "profile3",
      isActive: false,
    },
    {
      name: "Music",
      className: "no-edit music",
      id: "profile4",
      isActive: false,
    },
    // {
    //   name: "Custom 1",
    //   className: "custom",
    //   id: "custom1",
    // },
    // {
    //   name: "demo long text demo long text demo",
    //   className: "custom",
    //   id: "custom2",
    // },
  ],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileArray: (state, action) => {
      console.log(action.payload, "action payload");
      state.profileArray = action.payload;
    },
    addProfile: (state, action) => {
      console.log("profile added");
      state.profileArray.push({
        name: "New Profile",
        className: "custom",
        id: action.payload,
      });
    },
    changeProfile: (state, action) => {
      state.profileArray.forEach((profile) => {
        if (profile.id === action.payload) {
          profile.className = "active";
        } else {
          profile.className = "no-edit";
        }
      });
    },
    setActiveProfile(state, action) {
      state.profileArray = state.profileArray.map((profile) => ({
        ...profile,
        isActive: profile.id === action.payload,
      }));
    },

    editProfile: (state, action) => {
      // change profile name only
      state.profileArray.forEach((profile) => {
        if (profile.id === action.payload.id) {
          profile.name = action.payload.name;
        }
      });
    },
    deleteProfile: (state, action) => {
      console.log(action.payload, "delete this id");
      state.profileArray = state.profileArray.filter(
        (profile) => profile.id.toString() !== action.payload.toString()
      );
      console.log(state.profileArray, "updated array");
    },
  },
});

export const {
  setActiveProfile,
  addProfile,
  setProfileArray,
  changeProfile,
  editProfile,
  deleteProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
