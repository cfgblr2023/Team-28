import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";


const Transactions = () => {
  const {transaction,handleSubmit} = useStateContext()
  const editOptions = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };
  const toolbarOptions = ["Add", "Edit", "Delete", "Update", "Cancel"];
  const numericParams = { params: { decimals: 2 } };
  const ddParams = { params: { value: "Germany" } };
  const verifiedParams = { params: { checked: true } };
  const handleActionComplete = (completedAction) =>{

    if(completedAction.requestType==='save')
  {    console.log('completedAction',completedAction);  handleSubmit(completedAction?.data)}
  }
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Transactions" />
      <GridComponent
        dataSource={transaction}
        editSettings={editOptions}
        toolbar={toolbarOptions}
        height={265}
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        {/* <ColumnsDirective>
    <ColumnDirective field='OrderID' headerText='Order ID' width='100' textAlign="Right" isPrimaryKey={true}/>
    <ColumnDirective field='CustomerID' headerText='Customer ID' width='120'/>
    <ColumnDirective field='Freight' headerText='Freight' width='120' format="C2" editType='numericedit' edit={numericParams} textAlign="Right"/>
    <ColumnDirective field='ShipCountry' headerText='Ship Country' editType='dropdownedit' edit={ddParams} width='150'/>
    <ColumnDirective field='Verified' headerText='Verified' displayAsCheckBox={true} editType='booleanedit' edit={verifiedParams} width='150'/>
  </ColumnsDirective> */}
        <Inject services={[Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default Transactions;
