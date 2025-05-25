import { useState } from "react";
import { useInventoryData } from "./hooks/useInventoryData";

import EquipmentList from "./components/EquipmentList";
import AddEquipmentForm from "./components/AddEquipmentForm";
import FilterEquipment from "./components/FilterEquipment";

import "./App.css";

function App() {
  /**
   * These will be passed as props to components in order to:
   * 1) Know when to refresh equipmentList data, especially after adding new equipment, or applying filters
   * 2) Pass information from our filter form to our equipmentList so we know what elements to actually render and populate the list with.
   */
  const { equipment, locations, fetchData } = useInventoryData();
  const [filters, setFilters] = useState({});

  return (
    <div className="page-container">
      <div
        className="content-wrap"
        style={{
          backgroundColor: "#d8d8d8",
          fontFamily: "Roboto, sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          paddingBottom: "60px",
        }}
      >
        <div className="USF-banner">
          <img className="USF-banner-img" src="/USF_SEAL.png" alt=""></img>
          <div>
            <h1 className="USF-banner-title noselect">Welcome,</h1>
            <h2 className="USF-banner-title USF-banner-subtext noselect">
              Honors Inventory
            </h2>
          </div>
        </div>
        <div className="grid-container">
          <div className="grid-component-column">
            <div className="grid-component grid-component-small">
              <h1 className="component-title noselect">Add New Equipment</h1>
              <div>
                <AddEquipmentForm onEquipmentAdded={fetchData} />
              </div>
            </div>
            <div className="grid-component grid-component-small">
              <h1 className="component-title noselect">Filter Options</h1>
              <FilterEquipment onFilterChange={setFilters} />
            </div>
          </div>
          <div className="grid-component">
            <h1 className="component-title inventory-title noselect">
              Equipment Inventory
            </h1>
            <div className="inventory-component inventory-scroll">
              <EquipmentList
                equipment={equipment}
                locations={locations}
                refreshData={fetchData}
                filters={filters}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-banner"></div>
    </div>
  );
}

export default App;
