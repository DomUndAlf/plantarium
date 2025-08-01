import { createContext, useContext } from "react";

type DialogType = null | "garden" | "structure" | "bed" | "plant" | "bedplant";

export const DialogContext = createContext<{
  activeDialog: DialogType;
  setActiveDialog: (type: DialogType) => void;
}>({
  activeDialog: null,
  setActiveDialog: () => {},
});

export const useDialog = () => useContext(DialogContext);
