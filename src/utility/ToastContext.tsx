import React, { createContext, useState, ReactNode} from 'react';

interface ToastContextProps {
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToastContext = createContext<ToastContextProps>({
  showToast: false,
  setShowToast: () => {},
});

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [showToast, setShowToast] = useState(false);

  return (
    <ToastContext.Provider value={{ showToast, setShowToast }}>
      {children}
    </ToastContext.Provider>
  );
};
