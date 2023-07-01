import React, { createContext, useContext, useEffect, useState } from "react";
import { customersData } from "../data/dummy";

const StateContext = createContext();

const initialState = { 
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [transaction, setTransaction] = useState([
    // {
      // TransactionId: 1001,
      // Title: "Nirav Joshi",
      // Description: "Hosting Press HTML",
      // Type: "Active",
      // Amount: "40",
      // Month: "India",
    // },
  ]);

  useEffect(() => {
    // Retrieve the saved state from local storage on component mount
    const savedState = localStorage.getItem("transactionState");
    if (savedState) {
      setTransaction(JSON.parse(savedState));
    }
  }, []);

  useEffect(() => {
    // Save the transaction state to local storage whenever it changes
    localStorage.setItem("transactionState", JSON.stringify(transaction));
  }, [transaction]);

  const handleSubmit = (newTransaction) => {
    // e.preventDefault();
    // Handle form submission, e.g., send transaction data to backend or update state
    console.log(newTransaction);
    // setTransaction(transactionData)
    // Check if the transaction already exists based on transactionId
    const existingTransactionIndex = transaction.findIndex(
      (transaction) =>
        transaction.transactionId === newTransaction.transactionId
    );

    if (existingTransactionIndex !== -1) {
      // Transaction exists, update the values
      const updatedTransactions = [...transaction];
      updatedTransactions[existingTransactionIndex] = newTransaction;
      setTransaction(updatedTransactions);
    } else {
      // Transaction doesn't exist, add it to the transactions array
      setTransaction([...transaction, newTransaction]);
    }
  };

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
        handleSubmit,
        transaction,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
