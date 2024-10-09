
import React, { useState, useEffect } from 'react';


const AddInventory = ({ inventory, addInventoryItem, editInventoryItem, currentEditItem }) => {
  const [formData, setFormData] = useState({
    manufacturer: '',
    model: '',
    serialNumber: '',
    condition: '',
    description: '',
    borderColor: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    manufacturer: '',
    model: '',
    serialNumber: '',
    condition: '',
    description: '',
    borderColor: '',
  });

  useEffect(() => {
    if (currentEditItem) {
      setFormData(currentEditItem);
      setIsEditing(true);
    }
  }, [currentEditItem]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    
    for (const field in formData) {
      if (formData[field] === '') {
        newErrors[field] = `*`;
        isValid = false;
      }
    }

    if (!isEditing) {
      const isDuplicate = inventory.some(
        (item) => item.serialNumber === formData.serialNumber
      );

      if (isDuplicate) {
        newErrors.serialNumber = 'ID must be unique';
        isValid = false;
      }
    }

    
    if (isEditing) {
      const isDuplicate = inventory.some(
        (item) => item.serialNumber === formData.serialNumber && item.id !== formData.id
      );

      if (isDuplicate) {
        newErrors.serialNumber = 'ID must be unique';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditing) {
        editInventoryItem(formData);
      } else {
        addInventoryItem(formData);
      }

    
      setFormData({
        manufacturer: '',
        model: '',
        serialNumber: '',
        condition: '',
        description: '',
        borderColor: '',
      });
      setIsEditing(false);
      setErrors({});
    }
  };

  return (
    <div className="inventory-manager">
      <div className="form-container">
        <h2 className="mb-4 mt-2">{isEditing ? 'Edit Inventory' : 'Add Inventory'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="error-handle">
            <label>Maker/Manufacturer</label>{errors.manufacturer && <span className="error">{errors.manufacturer}</span>}
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
            />
          </div>

          <div className="group-container">
            <div className="error-handle">
              <label>ID {errors.serialNumber && <span className="error">{errors.serialNumber}</span>}</label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
              />
            </div>

            <div className="error-handle">
              <label className="card-label">Card Color {errors.borderColor && <span className="error">{errors.borderColor}</span>}</label>
              <input
                className="color-input"
                type="color"
                name="borderColor"
                value={formData.borderColor}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="error-handle d-flex flex-column">
            <label>Model {errors.model && <span className="error">{errors.model}</span>}</label>
            <select name="model" value={formData.model} onChange={handleChange}>
              <option value=""></option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div className="error-handle d-flex flex-column">
            <label>Condition {errors.condition && <span className="error">{errors.condition}</span>}</label>
            <select name="condition" value={formData.condition} onChange={handleChange}>
              <option value=""></option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>

          <div className="error-handle d-flex flex-column">
            <label>Description {errors.description && <span className="error">{errors.description}</span>}</label>
            <textarea name="description" value={formData.description} onChange={handleChange} />
          </div>

          <div>
            <hr />
            <button className="add-update-btn" type="submit">
              {isEditing ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInventory;
