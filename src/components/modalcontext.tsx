import { createContext, useContext, useState } from "react";

type ModalContextType = {
  showInterestsForm: boolean;
  openInterestsForm: () => void;
  closeInterestsForm: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [showInterestsForm, setShowInterestsForm] = useState(false);

  const openInterestsForm = () => setShowInterestsForm(true);
  const closeInterestsForm = () => setShowInterestsForm(false);

  return (
    <ModalContext.Provider value={{ showInterestsForm, openInterestsForm, closeInterestsForm }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
