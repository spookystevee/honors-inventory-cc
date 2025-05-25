import { useEffect, useState } from "react";
import { fetchEquipmentAndLocations } from "../utils/apiHelpers";

/**
 * This hook connects our App.tsx and our apiHelper utility to streamline API calls.
 * Fetches the equipment and location data using the apiHelper utility and then stores the data in states.
 * We also use fetchdata to manually refresh any components that require it.
 */

export function useInventoryData() {
  const [equipment, setEquipment] = useState([]);
  const [locations, setLocations] = useState([]);

  const fetchData = async () => {
    const { equipment, locations } = await fetchEquipmentAndLocations();
    setEquipment(equipment);
    setLocations(locations);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { equipment, locations, fetchData };
}
