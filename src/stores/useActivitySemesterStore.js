import { create } from "zustand";

const useActivitySemesterStore = create((set) => ({
  activitySemester: "2024-1",
  setActivitySemester: (activitySemester) => set({ activitySemester }),
}));

export default useActivitySemesterStore;
