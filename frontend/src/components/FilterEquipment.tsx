import { useState, useEffect } from "react";
//importing addequipmentform css since they use the same styling anyways
import "./addequipmentform.css";

/**
 * I'm aware that I don't need to actually make a filter for this challenge, but I figured it'd be relatively easy (and fun)
 * Turned out to not be too bad, although I don't know how good of an implementation it is.
 */

//Set up of props for FilterEquipment, mainly so we can pass these through to the equipmentlist to let it know what to render.
type FilterEquipmentProps = {
  onFilterChange: (filters: {
    model?: string;
    equipment_type?: string;
    room_name?: string;
  }) => void;
};

function FilterEquipment({ onFilterChange }: FilterEquipmentProps) {
  const [model, setModel] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [roomName, setRoomName] = useState("");
  const [clearState, setClearState] = useState(false);

  /**
   * useEffect is used to check for whenever we clear the filter, so that we call onFilterChange correctly
   * We also check if clearState is true so that we can be sure that we've clicked the clear filters button first
   * So even if we clear all fields, we will only invoke onFilterChange when we click the button.
   */
  useEffect(() => {
    if (!model && !equipmentType && !roomName && clearState) {
      onFilterChange({});
      setClearState(false);
    }
  }, [model, equipmentType, roomName, clearState, onFilterChange]);

  /**
   * When apply button is pressed, we call this, and apply the filter values by invoking onFilterChange from props.
   * In app.tsx, we take the filters and store them in a state so that we can pass that to EquipmentList
   */
  const handleApply = () => {
    onFilterChange({
      model: model.trim() || undefined,
      equipment_type: equipmentType.trim() || undefined,
      room_name: roomName.trim() || undefined,
    });
  };

  /**
   * If clear is pressed, we clear the states and then invoke onFilterChange
   * We also set ClearState to true, which allows the useEffect to correctly call onFilterChange
   * This is because we do not want to clear the filters if all fields are empty unless we also click the clear filters button.
   */
  const handleClear = () => {
    setModel("");
    setEquipmentType("");
    setRoomName("");
    setClearState(true);
  };

  return (
    <div className="equipment-form">
      <input
        className="form-input"
        type="text"
        placeholder="Filter by Model"
        value={model}
        onChange={(model) => setModel(model.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Filter by Equipment Type"
        value={equipmentType}
        onChange={(type) => setEquipmentType(type.target.value)}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Filter by Room Name"
        value={roomName}
        onChange={(room) => setRoomName(room.target.value)}
      />
      <div>
        <button className="form-button" onClick={handleApply}>
          Apply Filters
        </button>
        <button className="form-button" onClick={handleClear}>
          Clear Filters
        </button>
      </div>
    </div>
  );
}

export default FilterEquipment;
