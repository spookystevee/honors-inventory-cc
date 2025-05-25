import { useState } from "react";
import {
  transferEquipment,
  deleteEquipment,
  updateEquipment,
} from "../services/api";

import "./equipmentList.css";

// Props type for our EquipmentList component
type EquipmentListProps = {
  equipment: Equipment[];
  locations: string[];
  refreshData: () => void;
  filters: {
    model?: string;
    equipment_type?: string;
    room_name?: string;
  };
};

//Establishing an equipment item
type Equipment = {
  id: number;
  model: string;
  equipment_type: string;
  room_name: string;
  building_type: string;
};

function EquipmentList({
  equipment,
  locations,
  refreshData,
  filters,
}: EquipmentListProps) {
  //These allow us to edit our equipment by having them in useState and updating them accordingly.
  const [editId, setEditId] = useState<number | null>(null);
  const [editModel, setEditModel] = useState("");
  const [editType, setEditType] = useState("");
  const [editRoom, setEditRoom] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  //When we begin to edit, we fill out the fields with the existing information
  const startEdit = (item: Equipment) => {
    setEditId(item.id);
    setEditModel(item.model);
    setEditType(item.equipment_type);
    setEditRoom(item.room_name);
  };

  /**
   * Here we create a new array from filtering the equipment passed in with any filters we pass in
   * information passed in is case-insensitive and only has to partially match the string.
   * For example, searching for the room name as "warehouse" will still return values where the room name equals "HON Warehouse"
   * If that field is undefined or otherwise empty, we just return true to signify that anything will match the "filter"
   */
  const filteredEquipment = equipment.filter((item) => {
    const matchesModel = filters.model
      ? item.model.toLowerCase().includes(filters.model.toLowerCase())
      : true;

    const matchesType = filters.equipment_type
      ? item.equipment_type
          .toLowerCase()
          .includes(filters.equipment_type.toLowerCase())
      : true;
    const matchesRoom = filters.room_name
      ? item.room_name.toLowerCase().includes(filters.room_name.toLowerCase())
      : true;

    return matchesModel && matchesType && matchesRoom;
  });

  //Once we confirm a save to our edit, we apply the corresponding data and call on the API to update the database
  //Once the database is updated, we set EditId to null so edit mode is turned off, then we refresh the list to reflect the database accurately.
  const handleSaveEdit = async (id: number) => {
    await updateEquipment(id, editModel, editType);
    await transferEquipment(id, editRoom);
    setEditId(null);
    refreshData();
  };

  //When delete is pressed, we pop up a basic confirmation window to confirm the deletion.
  //If the confirmation is false, we return and do nothing. Otherwise, we delete the equipment with the specified id number then refresh our list.
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this equipment?"
    );
    if (!confirmed) return;
    await deleteEquipment(id);
    refreshData();
  };

  //If we're in edit mode and we press the cancel button, we clear the states.
  const cancelEdit = () => {
    setEditId(null);
    setEditModel("");
    setEditType("");
    setEditRoom("");
  };

  return (
    <div className="equipment-container">
      <ul className="equipment-list">
        {filteredEquipment.map((item) => (
          <li key={item.id} className="equipment-item">
            {editId === item.id ? (
              <>
                <input
                  className="edit-form-input"
                  value={editModel}
                  onChange={(model) => setEditModel(model.target.value)}
                />
                <input
                  className="edit-form-input"
                  value={editType}
                  onChange={(type) => setEditType(type.target.value)}
                />

                <div className="dropdown-container">
                  <input
                    className="edit-form-input"
                    type="text"
                    placeholder="Search room..."
                    value={editRoom}
                    onChange={(room) => {
                      setEditRoom(room.target.value);
                      setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setShowDropdown(false)}
                  />
                  {showDropdown && (
                    <ul className="dropdown-list">
                      {locations
                        .filter((room) =>
                          room.toLowerCase().includes(editRoom.toLowerCase())
                        )
                        .slice(0, 10)
                        .map((room) => (
                          <li
                            key={room}
                            onMouseDown={() => {
                              setEditRoom(room);
                              setShowDropdown(false);
                            }}
                            className="dropdown-item"
                          >
                            {room}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </>
            ) : (
              <p className="equipment-desc">
                {item.model} {item.equipment_type} located in{" "}
                {item.building_type} {item.room_name}
              </p>
            )}

            {editId === item.id ? (
              <>
                <button
                  onClick={() => handleSaveEdit(item.id)}
                  className="button-save"
                >
                  Save
                </button>
                <button onClick={cancelEdit} className="button-cancel">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={() => startEdit(item)} className="button-edit">
                Edit
              </button>
            )}

            <button
              onClick={() => handleDelete(item.id)}
              className="button-delete"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="count-subtext">
        Currently displaying {filteredEquipment.length} out of{" "}
        {equipment.length} items
      </div>
    </div>
  );
}

export default EquipmentList;
