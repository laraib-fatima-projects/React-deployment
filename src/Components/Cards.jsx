
import React from 'react';
import EditIcon from './svgs/EditIcon';
import Delete from './svgs/Delete';

const Cards = ({ item, onEdit, onDelete }) => {
  return (
    <div className="card" style={{ borderLeftColor: item.borderColor }}>
     
     <div className='d-flex justify-content-start  card-column'> 
      <p>Manufacturer: <span><b>{item.manufacturer}</b></span></p>
     <p>Modal: <span>{item.model}</span></p>
     </div>
     <div className='d-flex  justify-content-start  card-column'>
     <p>Serial Number <span> {item.serialNumber}</span></p>
     <p>Condition: <span>{item.condition}</span></p>
     </div>

      <div className='d-flex justify-content-start   card-column'>
    
     
      </div>
      <div className='card-column'>
      <p>Description: <span>{item.description}</span></p>
      </div>
      <div className='buttons-container'>
     <button className='edit-btn' onClick={() => onEdit(item)}><EditIcon/></button> 
     <button className='delete-btn' onClick={onDelete}><Delete/></button>
     </div>
    </div>
  );
};

export default Cards;
