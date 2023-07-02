import React from "react";
// import { BsCurrencyDollar } from "react-icons/bs";
// import { GoPrimitiveDot } from 'react-icons/go';
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

// import { Button, Pie, SparkLine, Stacked } from "../components";
// import { useStateContext } from "../contexts/ContextProvider";
import {
  SparklineAreaData,
  dropdownData,
  ecomPieChartData,
  recentTransactions,
} from "../data/dummy";

import { Link } from "react-router-dom";
import MapComponent from "../components/MapComponent";

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent
      id="time"
      fields={{ text: "Time", value: "Id" }}
      style={{ border: "none", color: currentMode === "Dark" && "white" }}
      value="1"
      dataSource={dropdownData}
      popupHeight="220px"
      popupWidth="120px"
    />
  </div>
);

const Home = () => {
  // const {
  //   currentColor,
  //   currentMode,
  //   transaction: transactions,
  // } = useStateContext();
  // const findTotal = (type) => {
  //   const expenseTotal = transactions.reduce((total, item) => {
  //     if (item.Type === type) {
  //       return total + parseFloat(item.Amount);
  //     }
  //     return total;
  //   }, 0);
  //   console.log(expenseTotal, "total");
  //   expenseTotal ? expenseTotal : 0;
  // };
  // console.log(transactions, "transactions");

  return (
    
    <div className="flex-1 min-h-full h-full w-full"><MapComponent/></div>
  );
};

export default Home;
