
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import VehicleProductionChart from "./components/VehicleProductionChart";
import VehicleStatusChart from "./components/VehicleStatusChart";
import Header from "./components/Header";
import Cards from "../../Components/Cards";
import Pagination from "./components/Pagination";
import Sidebar from "../AddRecord/components/SideBar";
import DashboardSidebar from "./components/DashboardSidebar";

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [viewType, setViewType] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedInventory = localStorage.getItem('inventory');
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    }
  }, []);

  useEffect(() => {
    if (inventory.length > 0) {
      localStorage.setItem('inventory', JSON.stringify(inventory));
    }
  }, [inventory]);

  const addInventoryItem = (item) => {
    setInventory([...inventory, item]);
  };

  const editInventoryItem = (updatedItem) => {
    const updatedInventory = inventory.map((item) =>
      item.serialNumber === updatedItem.serialNumber ? updatedItem : item
    );
    setInventory(updatedInventory);
  };

  const handleEditClick = (item) => {
    navigate("/add-record", { state: { item } });
  };

  const deleteInventoryItem = (serialNumber) => {
    const updatedInventory = inventory.filter((item) => item.serialNumber !== serialNumber);
    setInventory(updatedInventory);
  };

  const toggleView = (view) => {
    setViewType(view);
  };

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const totalPages = Math.ceil(inventory.length / pageSize);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); 
  };

  const currentItems = inventory.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="dashboard"> 
      <div className="d-flex">
      <DashboardSidebar
      notificationCount={inventory.length} 
          isCollapsed={isCollapsed} 
          toggleSidebar={toggleSidebar}
      />
        
        <div className="container-fluid charts-container">
          <Header viewType={viewType} toggleView={toggleView} /> 

          <div className="row g-3">
            <div className="col-lg-8"> 
              <VehicleProductionChart />
            </div>
            <div className="col-lg-4">
              <VehicleStatusChart />
            </div>

            <div className={`row col-lg-12 g-3 card-generation justify-content-center pe-0 ${viewType}`}>
              {currentItems.map((item, index) => (
                <div className={`col-lg-${viewType === 'grid' ? '4' : '12'} col-md-12 item-item pe-0`} key={index}>
                  <Cards
                    item={item}
                    onEdit={handleEditClick} 
                  />
                </div>
              ))}
            </div>

            
           
          </div>
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageSizeChange}
              totalEntries={inventory.length}
            />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
