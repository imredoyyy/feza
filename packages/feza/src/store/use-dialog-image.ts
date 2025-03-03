import { create } from "zustand";

interface DialogImageState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useDialogImage = create<DialogImageState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
