import React, { useState } from 'react';
import axios from 'axios';

function MaintenanceWOForm({ title, date, priority, status, description, id }) {
  const [workOrder, setWorkOrder] = useState({
    comment: '',
    status: '',
  });

  const handleChange = e => {
    setWorkOrder({ ...workOrder, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    axios.put(`https://xcel-wom-api-b.herokuapp.com/company/1/order/${id}`, {
      workOrder,
    });
  };
  const handleComplete = e => {
    axios.put(`https://xcel-wom-api-b.herokuapp.com/company/1/order/${id}`, {
      status: 5,
    });
  };

  return (
    <div>
      <form>
        <h1>{title}</h1>
        <p>Date created: {date}</p>
        <p>Pirority: {priority}</p>
        <p>Status: {status}</p>
        <p>{description}</p>
        <div>
          <p>Comments:</p>
          <input onChange={handleChange} name="comment" />
        </div>
        <button onClick={handleSubmit}>Update Work Order</button>
        <button onClick={handleComplete}>Mark Complete</button>
      </form>
    </div>
  );
}

export default MaintenanceWOForm;
