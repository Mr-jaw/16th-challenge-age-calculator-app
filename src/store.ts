import { create } from "zustand";

interface AgrStore {
  day: number;
  month: number;
  year: number;
  setDay: (day: number) => void;
  setMonth: (month: number) => void;
  setYear: (year: number) => void;
}

const useAgeStore = create<AgrStore>((set) => ({
  day: 0,
  month: 0,
  year: 0,
  setDay: (day) => set({ day: day }),
  setMonth: (month) => set({ month: month }),
  setYear: (year) => set({ year: year }),
}));

export default useAgeStore;
