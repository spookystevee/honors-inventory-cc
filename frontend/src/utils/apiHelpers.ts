import { getEquipment, getLocations } from "../services/api";

/**
 * This utility fetches both equipment and location data from our API.
 * We use this to abstract duplicate API calls from our components (EquipmentList and AddEquipmentForm)
 *
 * This returns:
 * equipment, which is a full array of our equipment objects
 * locations, which is an array of room names deriving from location data.
 */
export const fetchEquipmentAndLocations = async () => {
  const [equipmentRes, locationRes] = await Promise.all([
    getEquipment(),
    getLocations(),
  ]);
  return {
    equipment: equipmentRes.data,
    locations: locationRes.data.map((loc: any) => loc.room_name),
  };
};
