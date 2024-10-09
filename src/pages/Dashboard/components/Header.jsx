import React from "react";
import { Link } from "react-router-dom";
import ListVeiw from "../../../Components/svgs/ListVeiw";
import GridVeiw from "../../../Components/svgs/GridVeiw";



const Header = ({ viewType, toggleView,color }) => {
  color = 'white';
  return (
    <div className="header d-flex justify-content-between">
      <h2>Dashboard</h2>
      <div className="d-flex">
      <div className="view-toggle-buttons me-3">
        <button onClick={() => toggleView('list')} className={`btn ${viewType === 'list' ? 'active' : ''}`}>
         
         <ListVeiw/>
        </button>
        <button onClick={() => toggleView('grid')} className={`btn ${viewType === 'grid' ? 'active' : ''}`}>
         
       <GridVeiw/>
        </button>
      </div>
      <Link to="/add-record">
      <button>Add Record</button></Link>
      </div>
    </div>
  );
};



export default Header;
