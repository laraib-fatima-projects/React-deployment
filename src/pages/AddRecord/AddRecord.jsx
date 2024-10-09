


import React, { useState, useEffect } from 'react';
import Cards from '../../Components/Cards';
import AddInventory from '../AddRecord/components/AddInventory';
import Sidebar from './components/SideBar';
import { Link } from 'react-router-dom';

const AddRecord = (props) => {
  const [inventory, setInventory] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState(null);

 
  useEffect(() => {
    const storedInventory = localStorage.getItem('inventory');
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    }
  }, []);


  useEffect(() => {
    if (inventory.length > 0) {
      localStorage.setItem('inventory', JSON.stringify(inventory));
    } else {
    
      localStorage.removeItem('inventory');
    }
  }, [inventory]);

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const addInventoryItem = (item) => {
    setInventory([...inventory, item]);
  };

  const editInventoryItem = (updatedItem) => {
    const updatedInventory = inventory.map((item) =>
      item.serialNumber === updatedItem.serialNumber ? updatedItem : item
    );
    setInventory(updatedInventory);
    setCurrentEditItem(null); 
  };

  const handleEditClick = (item) => {
    setCurrentEditItem(item);
  };

  const deleteInventoryItem = (serialNumber) => {
    const updatedInventory = inventory.filter((item) => item.serialNumber !== serialNumber);
    setInventory(updatedInventory);
  };

  return (
    <div className='add-record'>
      <div>
        <Sidebar 
          notificationCount={inventory.length} 
          isCollapsed={isCollapsed} 
          toggleSidebar={toggleSidebar} 
        />
      </div>

      <div className="d-flex responsive-cards">
        <div className="cards-container">
          <div className="d-flex create-records-header mb-4">
            <h2 className='mb-0'>Created Records</h2>
            <Link to="/">
              <button>Update List</button>
            </Link>
          </div>

          <div className="row g-3 card-generation">
            {inventory.map((item, index) => (
              <div className="col-xxl-6 col-xl-12 col-lg-12 col-md-12 item-item pe-0" key={index}>
                <Cards
                  item={item}
                  onEdit={handleEditClick}
                  onDelete={() => deleteInventoryItem(item.serialNumber)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className='inventory-container'>
          <AddInventory
            inventory={inventory}
            addInventoryItem={addInventoryItem}
            editInventoryItem={editInventoryItem}
            currentEditItem={currentEditItem}
          />
        </div>
      </div>
    </div>
  );
};

export default AddRecord;
