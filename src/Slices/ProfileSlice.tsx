import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";
import { updateProfile } from "../Services/ProfileService";

const ProfileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    changeProfile: (state, action) => {
      if (!action?.payload.id) {
        console.error(state);
        return state; // Prevent update if no ID
      }
      return updateProfile(action.payload);
    },
    setProfile: (state, action) => {
      if (!action.payload.id) {
        console.error("Profile must have an ID");
        return state;
      }
      return action.payload;
    },
  },
});

export const { changeProfile, setProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
