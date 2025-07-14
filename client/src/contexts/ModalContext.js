import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const showLoginModal = () => setIsLoginVisible(true);
  const hideLoginModal = () => setIsLoginVisible(false);

  return (
    <ModalContext.Provider
      value={{ isLoginVisible, showLoginModal, hideLoginModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
