import { useState } from "react";
import { addEquipment } from "../services/api";
import "./addequipmentform.css";

//Type setup for props
type AddEquipmentFormProps = {
  onEquipmentAdded: () => void;
};

function AddEquipmentForm({ onEquipmentAdded }: AddEquipmentFormProps) {
  const [newModel, setNewModel] = useState("");
  const [newType, setNewType] = useState("");

  /**
   * Whenever the button is pressed to add equipment, this is called.
   * We check if either the model or equipment type fields are empty, and if they are, we return (that way we don't send undefined or empty information to the database)
   * Afterwards, we call to the API to add a new equipment with the model and type, then set the fields in the form to be empty.
   * Once everything is done, we call our onEquipmentAdded function to signal to the utility that we want to refresh the equipment list.
   */
  const handleAddEquipment = async () => {
    if (!newModel.trim() || !newType.trim()) return;
    await addEquipment(newModel, newType);
    setNewModel("");
    setNewType("");
    onEquipmentAdded();
  };

  return (
    <div className="equipment-form">
      <div>
        <input
          type="text"
          placeholder="Model"
          value={newModel}
          onChange={(model) => setNewModel(model.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Type"
          value={newType}
          onChange={(type) => setNewType(type.target.value)}
          className="form-input"
        />
        <button onClick={handleAddEquipment} className="form-button">
          Add
        </button>
      </div>
    </div>
  );
}

export default AddEquipmentForm;
