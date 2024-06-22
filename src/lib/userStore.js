import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

// for state management to easily masnage user info
export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  // fetching user info
  fetchUserInfo: async (uid) => {
    //this return if there isn't any user logged in
    if (!uid) return set({ currentUser: null, isLoading: false });
    try {
      //getting user docs
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      // if user exists , users docs would be accessible
      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (error) {
      //this return null isn't any user logged in
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
