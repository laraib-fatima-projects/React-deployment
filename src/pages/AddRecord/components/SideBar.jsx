import React from 'react';
import Toggler from '../../../Components/svgs/Toggler';
import DashboardIcon from '../../../Components/svgs/DashboardIcon';
import AssetMangement from '../../../Components/svgs/AssetMangement';
import ProductCatalog from '../../../Components/svgs/ProductCatalog';
import ReportsAnalysis from '../../../Components/svgs/ReportsAnalysis';
import Logo from '../../../Components/svgs/Logo';
import Notification from '../../../Components/svgs/Notification';
const Sidebar = ({ notificationCount, isCollapsed, toggleSidebar }) => {
  
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}> 
      <div className="sidebar-header">
        <div className="logo">
        <div className="logo-svg"><Logo/></div>
          <span className="logo-text">Assignment</span>
        </div>
        <button className="hamburger-btn" onClick={toggleSidebar}> 
         <Toggler/>
        </button>
      </div>

      <div className="menu">
        <ul>
          <li>
          <DashboardIcon/>
            <span className="menu-text active">Dashboard</span>
          </li>
          <li>
          <AssetMangement/>
            <span className="menu-text">Asset Management</span>
          </li>
          <li>
            <ProductCatalog/>
            <span className="menu-text">Product Catalog</span>
          </li>
          <li>
            <ReportsAnalysis/>
            <span className="menu-text">Reports & Analytics</span>
          </li>
        </ul>
      </div>
<hr />
      <div className="notifications">
       <div className="notification-svg">
       <Notification/>
       </div>
        <span className="notification-text">Notifications</span>
        <span className="notification-count">{notificationCount}</span>
      </div>
    </div>
  );
};

export default Sidebar;
