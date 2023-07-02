import React from 'react'
import { Button, Pie, SparkLine, Stacked } from '../components'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SparklineAreaData, dropdownData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { BsCurrencyDollar } from 'react-icons/bs';

const Analytics = () => {
    const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();
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
  return (
    <div><div className="mt-24">
      <div className="flex gap-10 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Your Activity</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>{/* <GoPrimitiveDot /> */}</span>
                <span>Actual</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>{/* <GoPrimitiveDot /> */}</span>
                <span>Allotted</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10 flex-wrap justify-center items-center">
            <div className=" border-r-1 border-color m-4 flex-col flex-1 justify-center items-center">
              

              <div className="mt-10">
                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Download Damage Overview"
                  borderRadius="10px"
                />
              </div>
            </div>
            <div>
              <Stacked currentMode={currentMode} width="320px" height="360px" />
            </div>
          </div>
        </div>
        <div>
          <div
            className=" rounded-2xl md:w-400 p-4 m-3"
            style={{ backgroundColor: currentColor }}
          >
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Monthly Hours</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">
                  $&nbsp;
                  6:05 hrs
                </p>
                <p className="text-gray-200">Daily Hours</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={SparklineAreaData}
                width="320"
                color="rgb(242, 252, 253)"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-10 m-4 flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="flex justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold">Damage Overview</p>
            <DropDown currentMode={currentMode} />
          </div>
          <div className="md:w-full overflow-auto">
            <Pie
              id="pie-chart"
              data={ecomPieChartData}
              legendVisiblity={false}
              height="420px"
            />
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default Analytics