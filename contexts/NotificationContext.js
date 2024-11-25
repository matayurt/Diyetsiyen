// app/context/NotificationContext.js
"use client";
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [pendingComments, setPendingComments] = useState(0);

  const updatePendingComments = (count) => {
    setPendingComments(count);
  };

  return (
    <NotificationContext.Provider
      value={{ pendingComments, updatePendingComments }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => useContext(NotificationContext);
